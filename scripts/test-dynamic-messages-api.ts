const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function runMessageApiTests() {
  console.log("================================================================================");
  console.log(`💬 TESTING LIVE DYNAMIC MESSAGES API (${BASE_URL})`);
  console.log("================================================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: any) {
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`, detail || "");
      failed++;
    }
  }

  try {
    // 1. GET /api/conversations
    console.log("\n📡 --- 1. CONVERSATIONS LISTING ---");
    const convsRes = await fetch(`${BASE_URL}/api/conversations`);
    assert(convsRes.ok, "GET /api/conversations returns HTTP 200");
    const convsData = await convsRes.json();
    assert(Array.isArray(convsData.conversations), "Response contains conversations array");
    assert(convsData.conversations.length > 0, `Retrieved ${convsData.conversations.length} seeded conversations`);

    const firstConv = convsData.conversations[0];
    const firstConvId = firstConv.id;

    // 2. GET /api/messages for conversation
    console.log("\n💬 --- 2. MESSAGES FETCHING ---");
    const msgsRes = await fetch(`${BASE_URL}/api/messages?conversationId=${encodeURIComponent(firstConvId)}`);
    assert(msgsRes.ok, `GET /api/messages?conversationId=${firstConvId} returns HTTP 200`);
    const msgsData = await msgsRes.json();
    assert(Array.isArray(msgsData.messages), "Response contains messages array");
    console.log(`     Loaded ${msgsData.messages.length} messages for channel '${firstConv.campaignTitle}'`);

    // 3. POST /api/conversations (Create a dynamic new conversation)
    console.log("\n✨ --- 3. DYNAMIC CONVERSATION CREATION ---");
    const createConvRes = await fetch(`${BASE_URL}/api/conversations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campaignTitle: "4K ProRes Cinematic Color Grading Brief",
        recipientId: "user-b2",
        recipientName: "Aethel Watches",
        recipientRole: "brand",
        senderId: "user-creator",
        senderRole: "creator",
        initialMessage: "Hi team, ready to begin pre-production on the autumn titanium watch film.",
      }),
    });
    assert(createConvRes.ok, "POST /api/conversations returns HTTP 200");
    const createConvData = await createConvRes.json();
    assert(createConvData.success === true, "Conversation creation reported success");
    const createdConvId = createConvData.conversation.id;
    assert(Boolean(createdConvId), `Created dynamic conversation ID: ${createdConvId}`);

    // 4. POST /api/messages (Send message with attachment)
    console.log("\n📎 --- 4. SEND MESSAGE WITH ATTACHMENT ---");
    const sendMsgRes = await fetch(`${BASE_URL}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: createdConvId,
        senderId: "user-creator",
        senderRole: "creator",
        senderName: "Demo Creator",
        content: "Here is the color-graded storyboard sample and reference reel.",
        attachments: [
          {
            type: "video",
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            name: "Aethel_Color_Grade_V1.mp4",
            size: "84.2 MB",
          },
        ],
      }),
    });
    assert(sendMsgRes.ok, "POST /api/messages returns HTTP 200");
    const sendMsgData = await sendMsgRes.json();
    assert(sendMsgData.success === true, "Message sent successfully");
    const createdMsgId = sendMsgData.message.id;
    assert(sendMsgData.message.attachments?.[0]?.name === "Aethel_Color_Grade_V1.mp4", "Attachment metadata saved on server");

    // 5. POST /api/messages/react (Toggle emoji reaction)
    console.log("\n❤️ --- 5. EMOJI REACTIONS ---");
    const reactRes = await fetch(`${BASE_URL}/api/messages/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messageId: createdMsgId,
        emoji: "🔥",
        userId: "user-b2",
      }),
    });
    assert(reactRes.ok, "POST /api/messages/react returns HTTP 200");
    const reactData = await reactRes.json();
    assert(reactData.message.reactions?.some((r: any) => r.emoji === "🔥" && r.count === 1), "Reaction '🔥' added with count 1");

    // Toggle reaction again (remove)
    const unreactRes = await fetch(`${BASE_URL}/api/messages/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messageId: createdMsgId,
        emoji: "🔥",
        userId: "user-b2",
      }),
    });
    assert(unreactRes.ok, "Second POST /api/messages/react toggles reaction off");
    const unreactData = await unreactRes.json();
    assert(!unreactData.message.reactions?.some((r: any) => r.emoji === "🔥"), "Reaction '🔥' cleanly removed when toggled");

    // 6. POST /api/conversations/[id]/read (Mark conversation read)
    console.log("\n👁️ --- 6. READ RECEIPTS & UNREAD CLEARING ---");
    const readRes = await fetch(`${BASE_URL}/api/conversations/${createdConvId}/read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user-b2" }),
    });
    assert(readRes.ok, `POST /api/conversations/${createdConvId}/read returns HTTP 200`);

    // 7. DELETE /api/conversations/[id] (Delete conversation)
    console.log("\n🗑️ --- 7. CONVERSATION DELETION ---");
    const delRes = await fetch(`${BASE_URL}/api/conversations/${createdConvId}`, {
      method: "DELETE",
    });
    assert(delRes.ok, `DELETE /api/conversations/${createdConvId} returns HTTP 200`);
    const delData = await delRes.json();
    assert(delData.deletedId === createdConvId, "Conversation deleted from database");

  } catch (err: any) {
    console.error("Test execution failed:", err);
    failed++;
  }

  console.log("================================================================================");
  console.log(`🏁 LIVE MESSAGES API TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runMessageApiTests();
