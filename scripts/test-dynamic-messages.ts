import { messageRepo } from "../src/server/repositories/message.repo.ts";
import { db } from "../src/server/db/database.ts";

async function runMessageModuleTests() {
  console.log("================================================================================");
  console.log("💬 TESTING DYNAMIC MESSAGING MODULE & REAL-TIME CHAT REPOSITORY");
  console.log("================================================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Initial conversations check
    const convs = await messageRepo.getConversations();
    assert(Array.isArray(convs) && convs.length > 0, "Initial conversations retrieved from database");

    // 2. Initial messages check
    const firstConvId = convs[0].id;
    const msgs = await messageRepo.getMessages(firstConvId);
    assert(Array.isArray(msgs) && msgs.length > 0, `Messages loaded for conversation ${firstConvId}`);

    // 3. Create a dynamic new conversation
    const newConv = await messageRepo.createConversation({
      campaignId: "camp-test-1",
      campaignTitle: "Dynamic 4K Masterclass Campaign",
      participants: [
        {
          userId: "user-creator",
          name: "Demo Creator",
          role: "creator",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
        },
        {
          userId: "user-brand-test",
          name: "Apex Gaming Audio",
          role: "brand",
          avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
        },
      ],
    });
    assert(Boolean(newConv && newConv.id), `New conversation created dynamically: ${newConv.id}`);
    assert(newConv.campaignTitle === "Dynamic 4K Masterclass Campaign", "New conversation title persisted");

    // 4. Send a message with attachment
    const newMsg = await messageRepo.createMessage({
      conversationId: newConv.id,
      senderId: "user-creator",
      senderRole: "creator",
      senderName: "Demo Creator",
      senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
      content: "Here is the raw ProRes storyboard cut for review.",
      attachments: [
        {
          type: "video",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          name: "Apex_Raw_Cut_V1.mov",
          size: "420.5 MB",
        },
      ],
    });
    assert(Boolean(newMsg && newMsg.id), `Message sent with attachment: ${newMsg.id}`);
    assert(newMsg.attachments?.[0]?.name === "Apex_Raw_Cut_V1.mov", "Attachment metadata saved");

    // 5. Verify conversation lastMessage updated
    const updatedConvs = await messageRepo.getConversations();
    const updatedTargetConv = updatedConvs.find((c) => c.id === newConv.id);
    assert(updatedTargetConv?.lastMessage?.content === "Here is the raw ProRes storyboard cut for review.", "Conversation lastMessage dynamically updated");
    assert((updatedTargetConv?.unreadCount || 0) > 0, "Unread count dynamically incremented");

    // 6. Toggle emoji reaction
    const reactedMsg = await messageRepo.toggleReaction(newMsg.id, "🔥", "user-brand-test");
    assert(Boolean(reactedMsg?.reactions?.some((r) => r.emoji === "🔥" && r.count === 1)), "Emoji reaction '🔥' added by partner");

    // Toggle again by same user should remove reaction
    const unreactedMsg = await messageRepo.toggleReaction(newMsg.id, "🔥", "user-brand-test");
    assert(!unreactedMsg?.reactions?.some((r) => r.emoji === "🔥"), "Toggling emoji reaction again removes it cleanly");

    // 7. Mark conversation as read
    await messageRepo.markConversationAsRead(newConv.id, "user-brand-test");
    const readConvs = await messageRepo.getConversations();
    const readTargetConv = readConvs.find((c) => c.id === newConv.id);
    assert(readTargetConv?.unreadCount === 0, "Conversation unread count reset to 0 after mark-as-read");

    // 8. Delete conversation
    await messageRepo.deleteConversation(newConv.id);
    const postDeleteConvs = await messageRepo.getConversations();
    assert(!postDeleteConvs.some((c) => c.id === newConv.id), "Conversation deleted cleanly from database");
    const postDeleteMsgs = await messageRepo.getMessages(newConv.id);
    assert(postDeleteMsgs.length === 0, "All associated messages removed on conversation deletion");

  } catch (err: any) {
    console.error("Test execution failed with error:", err);
    failed++;
  }

  console.log("================================================================================");
  console.log(`🏁 DYNAMIC MESSAGING TESTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runMessageModuleTests();
