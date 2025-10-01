// Real persistent storage using in-memory state (for demo purposes)
// In production, you might want to use a database or file system

const DEFAULT_STATE = {
  Q: 0, // Start with flag index 0, increments only when someone submits correct flag
  totalAttempts: 0,
  lastUpdated: Date.now(),
  lastRotation: Date.now(), // Track when flag was last rotated
  usedFlags: {}, // Track which flags have been used and blocked
  rotationTrigger: 'submission-based', // Rotation happens on correct submissions only
  flagList: [
    'ZmxhZ3s5cjM0N193MFJLfQ==',
    'ZmxhZ3tnckVhdF93b1JLXzF4fQ==',
    'ZmxhZ3tDME45cjQ3NV95MFVfRDFkXzE3XzJ9',
    'ZmxhZ3tZMFVfZjBVbkRfN2gzX2ZsNDlfM30=',
    'ZmxhZ3t3M2xMX2QwTjNfNH0=',
    'ZmxhZ3tXZUxjb21FX3RvX3RoRV9jbFViXzV9',
    'ZmxhZ3szbjE1MF9DeWIzcjlVNHJkNV82eH0=',
    'ZmxhZ3szbjE1MF9DeUIzcjl1NFJkNV83fQ==',
    'ZmxhZ3t5MHVfZjBVTkRfN0gzX0ZMNDlfOH0=',
    'ZmxhZ3tncmVhdF9Xb3JrXzl9',
    'ZmxhZ3tDMG45UjQ3NV95MHVfRDFkXzE3XzEwfQ==',
    'ZmxhZ3t3M0xjMG0zX2N5YjNSOXU0cmRfMTF9',
    'ZmxhZ3t3M2xjME0zX2N5YjNSOXU0UmRfMTJ4fQ==',
    'ZmxhZ3tHUmVBdF93T1JLXzEzfQ==',
    'ZmxhZ3szbjE1MF9jeWIzUjlVNHJENV8xNH0=',
    'ZmxhZ3tXM2xjMG0zX2N5QjNyOVU0cmR9',
    'ZmxhZ3t5MFVfZjBVbmRfN2gzX2ZMNDlfMTZ4fQ==',
    'ZmxhZ3szbjE1MF9jWUIzUjlVNHJENV8xN3h9',
    'ZmxhZ3tXM0xjMG0zX0N5QjNyOVU0ckRfMTh9',
    'ZmxhZ3tjMG45cjQ3NV95MFVfZDFEXzE3XzE5fQ==',
    'ZmxhZ3t5MHVfRjB1bmRfN2gzX0ZMNDl9',
    'ZmxhZ3tHckVBdF93b3JrXzIxfQ==',
    'ZmxhZ3t5T3VfRm9VbmRfVGhlX2ZsYWdfMjJ9',
    'ZmxhZ3t3ZWxMX2RvbkVfMjN9',
    'ZmxhZ3tXRUxDb01FX3RPX3RoRV9jbHViXzI0eH0=',
    'ZmxhZ3tFTmlzb19jeWJFckd1YXJkc18yNX0=',
    'ZmxhZ3t3RWxMX0RPTkVfMjZ9',
    'ZmxhZ3t3M2xjMG0zX2NZQjNyOVU0UmRfMjd9',
    'ZmxhZ3t3ZUxsX0RPTmVfMjh9',
    'ZmxhZ3tjb05nUmF0c19Zb3VfZElkX2lUXzI5eH0=',
    'ZmxhZ3t5b1VfZm91bkRfdEhlX2ZsQUdfMzB9',
    'ZmxhZ3tXM2xjMG0zX2N5QjNyOVU0ckRfMzF9',
    'ZmxhZ3szbjE1MF9DWUIzcjlVNHJkNV8zMnh9',
    'ZmxhZ3tZMHVfRjBVbmRfN0gzX0ZsNDlfMzN9',
    'ZmxhZ3t3RUxsX2RPbmVfMzR9',
    'ZmxhZ3t3M2xjME0zXzcwXzdIM19jbHVCXzM1fQ==',
    'ZmxhZ3tjMG45cjQ3NV95MFVfRDFkXzE3fQ==',
    'ZmxhZ3t3ZWxjb01FX3RvX3RoZV9DbHVCXzM3fQ==',
    'ZmxhZ3tjME45UjQ3NV95MFVfRDFkXzE3XzM4fQ==',
    'ZmxhZ3t3ZWxMX2RvbkVfMzl9',
    'ZmxhZ3tZMHVfZjB1bkRfN2gzX2ZsNDl4fQ==',
    'ZmxhZ3tDMG45cjQ3NV95MFVfRDFkXzE3XzQxfQ==',
    'ZmxhZ3t3M2xjMG0zX0N5QjNSOXU0ckR9',
    'ZmxhZ3tjME45cjQ3NV9ZMHVfRDFkXzE3XzQzfQ==',
    'ZmxhZ3tXM0xDME0zX0N5YjNSOVU0cmR9',
    'ZmxhZ3s5cjM0N19XMHJreH0=',
    'ZmxhZ3t3RUxDT21FX1RPX3RoZV9jbHVCXzQ2eH0=',
    'ZmxhZ3tlbmlzb19jWWJlckdVYVJEc180N30=',
    'ZmxhZ3tXM2xjMG0zX0N5QjNyOXU0UkRfNDh9',
    'ZmxhZ3s5cjM0N19XMHJrXzQ5fQ==',
    'ZmxhZ3s5cjM0N19XMFJrfQ==',
    'ZmxhZ3t3ZWxjb21lX3RPX1RIZV9jbFVCXzUxfQ==',
    'ZmxhZ3tjMG45cjQ3NV95MFVfRDFkXzE3XzJ4fQ==',
    'ZmxhZ3s5UjM0N19XMHJLXzN9',
    'ZmxhZ3tXM2xMX2QwbjNfNH0=',
    'ZmxhZ3s5cjM0N19XMHJrXzV9',
    'ZmxhZ3t3M2xsX2QwTjNfNn0=',
    'ZmxhZ3t3RUxDb21lX1RvX1RIRV9jbHViXzd9',
    'ZmxhZ3tjb05nUmFUU19Zb3VfZGlkX2lUXzU4fQ==',
    'ZmxhZ3tZMHVfRjB1TmRfN2gzX0ZMNDl4fQ==',
    'ZmxhZ3t3M0xjMG0zX0N5QjNyOVU0ckRfMTB4fQ==',
    'ZmxhZ3szTjE1MF9DeWIzUjl1NFJENX0=',
    'ZmxhZ3tXRWxjb21FX1RvX1RIRV9DbFViXzEyfQ==',
    'ZmxhZ3t3RUxDT01lX2N5YmVyZ3VhckRfMTN9',
    'ZmxhZ3t3RUxDb01lX3RPX3RoZV9jbHViXzY0fQ==',
    'ZmxhZ3t3M2xjMG0zXzcwXzdoM19DbHVCXzE1fQ==',
    'ZmxhZ3t3M2xsX2QwbjN9',
    'ZmxhZ3tXM0xjME0zXzcwXzdoM19DbFVieH0=',
    'ZmxhZ3szTjE1MF9DeUIzUjl1NFJkNV8xOH0=',
    'ZmxhZ3szbjE1MF9jWWIzcjl1NHJENXh9',
    'ZmxhZ3t3ZUxjb01lX3RPX3RIZV9DTHVCXzIweH0=',
    'ZmxhZ3tjMG45UjQ3NV95MFVfZDFkXzE3XzIxfQ==',
    'ZmxhZ3t3RWxjb21lX0NZQmVSZ3VBcmRfMjJ4fQ==',
    'ZmxhZ3t3M2xDMG0zX2N5YjNSOXU0cmR9',
    'ZmxhZ3tjME45cjQ3NV95MFVfRDFEXzE3XzI0fQ==',
    'ZmxhZ3tXM2xDME0zXzcwXzdIM19jbFVifQ==',
    'ZmxhZ3t3RWxsX2RPbmVfMjZ9',
    'ZmxhZ3t3M0xjMG0zX2NZYjNSOVU0ckRfMjd9',
    'ZmxhZ3tDT25nUmF0U195b3VfZGlEX0l0Xzc4fQ==',
    'ZmxhZ3tncmVBVF93T3JLXzI5fQ==',
    'ZmxhZ3tDT25ncmF0U19Zb3VfZGlkX0l0XzgwfQ==',
    'ZmxhZ3szTjE1MF9jWWIzUjl1NFJkNX0=',
    'ZmxhZ3t3M2xDMG0zX2N5QjNyOVU0cmR4fQ==',
    'ZmxhZ3t3M2xDMG0zXzcwXzdoM19DTFVieH0=',
    'ZmxhZ3szbjE1MF9jeUIzcjl1NFJkNV8zNHh9',
    'ZmxhZ3tjMG45UjQ3NV9ZMHVfZDFEXzE3fQ==',
    'ZmxhZ3t5MFVfZjB1TmRfN0gzX2ZsNDlfMzZ9',
    'ZmxhZ3tDMG45cjQ3NV95MHVfZDFEXzE3eH0=',
    'ZmxhZ3s5UjM0N193MHJrXzM4fQ==',
    'ZmxhZ3tlbklzb19jeWJlckd1YVJEc184OX0=',
    'ZmxhZ3tnUkVhdF9Xb1JrXzkwfQ==',
    'ZmxhZ3szbjE1MF9DeUIzUjl1NFJkNV80MX0=',
    'ZmxhZ3tXZUxjb21lX3RPX1RoZV9jbHViXzQyfQ==',
    'ZmxhZ3t5MHVfRjB1TkRfN2gzX2ZsNDlfNDN9',
    'ZmxhZ3szbjE1MF9jeUIzcjl1NHJENV80NH0=',
    'ZmxhZ3t5MFVfZjBVTmRfN2gzX2ZsNDlfNDV9',
    'ZmxhZ3tXM2xjMG0zXzcwXzdIM19DbFViXzQ2eH0=',
    'ZmxhZ3szbjE1MF9jWUIzcjl1NFJENV80N30=',
    'ZmxhZ3s5cjM0N193MHJrXzQ4fQ==',
    'ZmxhZ3t3M0xDMG0zXzcwXzdoM19jbHViXzQ5fQ=='
    ]
};

// In-memory state storage
let currentState = { ...DEFAULT_STATE };

// Read state from memory
async function readStateFromStorage() {
  console.log('📡 Reading state from memory...');
  console.log('✅ Successfully read state from memory:', currentState);
  return currentState;
}

// Write state to memory
async function writeStateToStorage(state) {
  console.log('💾 Writing state to memory:', state);
  currentState = { ...state };
  console.log('✅ Successfully saved state to memory');
  return true;
}

async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Always read current state from external storage
    let currentState = await readStateFromStorage();
    
    // No automatic time-based rotation - only submission-based rotation
    console.log(`� Current state: Q=${currentState.Q}, usedFlags=${Object.keys(currentState.usedFlags || {}).length}`);

    if (req.method === 'GET') {
      // Get current flag content for verification
      const flagList = currentState.flagList || DEFAULT_STATE.flagList;
      const currentFlagContent = Buffer.from(flagList[currentState.Q] || '', 'base64').toString();
    
      console.log(`📊 GET Request - Q=${currentState.Q}, Flag="${currentFlagContent}", Mode=submission-based`);
    
      // Sanitize the response to hide sensitive data
      res.status(200).json({
        Q: currentState.Q,
        attempts: currentState.totalAttempts,
        lastUpdated: currentState.lastUpdated,
        lastRotation: currentState.lastRotation,
        rotationMode: 'submission-based',
        serverTime: Date.now(),
        usedFlagsCount: Object.keys(currentState.usedFlags || {}).length,
        // Remove sensitive fields like currentFlagContent and currentFlagEncrypted
      });
    } else if (req.method === 'POST') {
      const { action, flagIndex, submittedFlag } = req.body;
      const newState = { ...currentState };
    
      switch (action) {
        case 'increment_attempts':
          newState.totalAttempts++;
          newState.lastUpdated = Date.now();
          break;
    
        case 'validate_and_submit_flag':
          // Check if the submitted flag matches the current active flag
          if (typeof submittedFlag === 'string') {
            const flagList = currentState.flagList || DEFAULT_STATE.flagList;
            const currentActiveFlag = Buffer.from(flagList[currentState.Q] || '', 'base64').toString();
            const normalizedSubmitted = submittedFlag.replace(/^flag\{|\}$/g, '');
            const normalizedCurrent = currentActiveFlag.replace(/^flag\{|\}$/g, '');
    
            console.log(`🔍 Validating flag: "${normalizedSubmitted}" against current: "${normalizedCurrent}" (Q=${currentState.Q})`);
    
            if (!newState.usedFlags) {
              newState.usedFlags = {};
            }
    
            const flagKey = normalizedCurrent;
            if (newState.usedFlags[flagKey]) {
              newState.totalAttempts++;
              newState.lastUpdated = Date.now();
              console.log(`❌ FLAG BLOCKED: "${normalizedSubmitted}" was already submitted and is now invalid`);
    
              const saved = await writeStateToStorage(newState);
              return res.status(200).json({
                success: false,
                Q: newState.Q,
                attempts: newState.totalAttempts,
                lastUpdated: newState.lastUpdated,
                serverTime: Date.now(),
                message: 'This flag has already been submitted and is now blocked. Try the current active flag.',
                flagBlocked: true,
                rotationTriggered: false,
                saved: saved
              });
            }
    
            if (normalizedSubmitted === normalizedCurrent || submittedFlag === `flag{${normalizedCurrent}}`) {
              newState.usedFlags[flagKey] = true;
              newState.Q = (currentState.Q + 1) % 99;
              newState.lastRotation = Date.now();
              newState.totalAttempts++;
              newState.lastUpdated = Date.now();
    
              console.log(`🎯 FLAG ACCEPTED & ROTATED! "${normalizedCurrent}" blocked. Q incremented from ${currentState.Q} to ${newState.Q}.`);
    
              const saved = await writeStateToStorage(newState);
              return res.status(200).json({
                success: true,
                Q: newState.Q,
                attempts: newState.totalAttempts,
                lastUpdated: newState.lastUpdated,
                serverTime: Date.now(),
                message: `Flag accepted! Rotating to next flag. This flag is now permanently blocked.`,
                rotationTriggered: true,
                previousQ: currentState.Q,
                newQ: newState.Q,
                globalRefresh: true,
                saved: saved
              });
            } else {
              newState.totalAttempts++;
              newState.lastUpdated = Date.now();
              console.log(`❌ FLAG REJECTED: "${normalizedSubmitted}" is not the current flag (Q=${currentState.Q})`);
    
              const saved = await writeStateToStorage(newState);
              return res.status(200).json({
                success: false,
                Q: newState.Q,
                attempts: newState.totalAttempts,
                lastUpdated: newState.lastUpdated,
                serverTime: Date.now(),
                message: 'Invalid flag.',
                saved: saved
              });
            }
          }
          break;
    
        case 'reset':
          Object.assign(newState, DEFAULT_STATE);
          newState.lastUpdated = Date.now();
          console.log('🔄 State reset to defaults - Q=0');
          break;
    
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    
      const saved = await writeStateToStorage(newState);
    
      if (!saved) {
        console.error('⚠️ Failed to save to memory, this should not happen');
      }
    
      res.status(200).json({
        Q: newState.Q,
        attempts: newState.totalAttempts,
        lastUpdated: newState.lastUpdated,
        serverTime: Date.now(),
        saved: saved
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

module.exports = handler;