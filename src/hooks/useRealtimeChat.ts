"use client";

import { useEffect, useRef, useCallback } from "react";
import { ChatMessage, Conversation } from "@/core/types";
import { getBrowserSupabase } from "@/lib/supabaseClient";

export type RealtimeChatEvent =
  | { type: "NEW_MESSAGE"; message: ChatMessage }
  | { type: "TYPING"; conversationId: string; userId: string; userName: string; isTyping: boolean }
  | { type: "CONVERSATION_UPDATED"; conversation: Conversation }
  | { type: "REACTION_TOGGLED"; messageId: string; reactions: any[] }
  | { type: "CONVERSATION_READ"; conversationId: string; userId: string };

interface UseRealtimeChatOptions {
  activeConvId?: string;
  currentUserId?: string;
  onNewMessage?: (message: ChatMessage) => void;
  onTyping?: (data: { conversationId: string; userId: string; userName: string; isTyping: boolean }) => void;
  onConversationUpdated?: (conversation: Conversation) => void;
  onReactionToggled?: (messageId: string, reactions: any[]) => void;
  onConversationRead?: (conversationId: string, userId: string) => void;
}

const CHANNEL_NAME = "collab_realtime_chat";

export function useRealtimeChat(options: UseRealtimeChatOptions) {
  const {
    activeConvId,
    currentUserId,
    onNewMessage,
    onTyping,
    onConversationUpdated,
    onReactionToggled,
    onConversationRead,
  } = options;

  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep latest callbacks in refs to avoid re-subscribing
  const callbacksRef = useRef(options);
  callbacksRef.current = options;

  useEffect(() => {
    // 1. Setup Client BroadcastChannel (Instant Sub-10ms Cross-Tab Sync)
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        const bc = new BroadcastChannel(CHANNEL_NAME);
        broadcastChannelRef.current = bc;

        bc.onmessage = (event: MessageEvent<RealtimeChatEvent>) => {
          const payload = event.data;
          if (!payload || !payload.type) return;

          switch (payload.type) {
            case "NEW_MESSAGE":
              callbacksRef.current.onNewMessage?.(payload.message);
              break;
            case "TYPING":
              // Don't report own typing back to self
              if (payload.userId !== currentUserId) {
                callbacksRef.current.onTyping?.(payload);
              }
              break;
            case "CONVERSATION_UPDATED":
              callbacksRef.current.onConversationUpdated?.(payload.conversation);
              break;
            case "REACTION_TOGGLED":
              callbacksRef.current.onReactionToggled?.(payload.messageId, payload.reactions);
              break;
            case "CONVERSATION_READ":
              callbacksRef.current.onConversationRead?.(payload.conversationId, payload.userId);
              break;
          }
        };
      } catch (err) {
        console.warn("BroadcastChannel initialization skipped:", err);
      }
    }

    // 2. Setup Supabase Realtime channel if available
    let supabaseChannel: any = null;
    try {
      const supabase = getBrowserSupabase();
      if (supabase && typeof supabase.channel === "function") {
        supabaseChannel = supabase.channel(`chat-room-${activeConvId || "global"}`)
          .on("broadcast", { event: "chat_event" }, ({ payload }: { payload: RealtimeChatEvent }) => {
            if (payload.type === "NEW_MESSAGE") {
              callbacksRef.current.onNewMessage?.(payload.message);
            } else if (payload.type === "TYPING" && payload.userId !== currentUserId) {
              callbacksRef.current.onTyping?.(payload);
            }
          })
          .subscribe();
      }
    } catch {
      // Supabase realtime optional fallback
    }

    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
        broadcastChannelRef.current = null;
      }
      if (supabaseChannel) {
        try {
          const supabase = getBrowserSupabase();
          supabase.removeChannel(supabaseChannel);
        } catch {}
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [activeConvId, currentUserId]);

  // Broadcast an event out to all other clients/tabs
  const broadcastEvent = useCallback((event: RealtimeChatEvent) => {
    if (broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current.postMessage(event);
      } catch (err) {
        console.warn("Failed to broadcast chat event:", err);
      }
    }

    // Also attempt Supabase Realtime broadcast if available
    try {
      const supabase = getBrowserSupabase();
      if (supabase && typeof supabase.channel === "function") {
        supabase.channel(`chat-room-${activeConvId || "global"}`).send({
          type: "broadcast",
          event: "chat_event",
          payload: event,
        });
      }
    } catch {}
  }, [activeConvId]);

  // Send typing notification
  const notifyTyping = useCallback(
    (userName: string, isTyping: boolean) => {
      if (!activeConvId || !currentUserId) return;

      broadcastEvent({
        type: "TYPING",
        conversationId: activeConvId,
        userId: currentUserId,
        userName,
        isTyping,
      });

      // Automatically reset typing after 3 seconds of inactivity
      if (isTyping) {
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          broadcastEvent({
            type: "TYPING",
            conversationId: activeConvId,
            userId: currentUserId,
            userName,
            isTyping: false,
          });
        }, 3000);
      }
    },
    [activeConvId, currentUserId, broadcastEvent]
  );

  return {
    broadcastEvent,
    notifyTyping,
  };
}
