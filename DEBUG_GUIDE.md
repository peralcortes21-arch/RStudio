# RStudio App Debug Guide

## Quick Diagnosis

Created: `test-debug.html` - A comprehensive diagnostic tool

### What's Broken?

Based on the code analysis, here are the most likely issues:

#### 1. **"Algo pegado en esquina superior izquierda"** (Stuck in corner)
   - **Culprit**: Custom cursor element `#cur` (CSS line 112)
   - **Cause**: If JavaScript crashes or halts, the cursor tracker stops working
   - **Position**: Fixed at `top:0, left:0, z-index:9999`
   - **Fix needed**: Check if init() completes successfully

#### 2. **"No ve calendarios/cursos"** (Can't see calendars)
   - **Problem**: `/api/calendars` endpoint may be failing or returning empty
   - **Function**: `renderCalBar()` depends on successful `getCals()` call
   - **Location**: Lines 1152-1156, called in init() at line 2315
   - **Fix needed**: Verify API is responding with calendar data

#### 3. **"No puede usar herramienta"** (Can't use tool)
   - **Problem**: If no calendar is active (`activeCal = null`), nothing works
   - **Reason**: All generation features require an active calendar
   - **State Variable**: Line 1040: `let activeCal=null;`
   - **Fix needed**: Ensure first calendar loads in init()

#### 4. **"App parece estar dentro de un usuario"** (App looks trapped)
   - **Problem**: Likely seeing navbar but empty main area
   - **Cause**: overflow:hidden on body/main/col hides scrollbars and content
   - **CSS**: Lines 105, 129, 130
   - **Fix needed**: Check if init() completes fully

---

## Using test-debug.html

### How to Run:
1. Open in browser: `file:///Users/nicolasag/Desktop/RStudio/test-debug.html`
2. View results in the page (organized by category)
3. Also check browser Console (F12 → Console) for additional logs

### What It Tests:

| Test Category | What It Checks | Expected Result |
|---|---|---|
| **Initialization** | Does init() complete? | Should show ✓ all green |
| **DOM Elements** | Do all critical IDs exist? | Should find #app, #user-nm, #calbar, etc |
| **API Endpoints** | Do /api/* routes respond? | Should get 200 responses |
| **Functions** | Are key functions callable? | Should find renderFmtPicker, renderCalBar, getCals |
| **Visual** | Is UI visible? | Should see app container, topbar, panels |
| **State** | Is global state initialized? | Should have AM, AF, AT, AA, activeCal |

---

## Code Structure Analysis

### The init() Function (Lines 2311-2318)
```javascript
async function init(){
  document.getElementById('app').style.display='flex';          // Show app
  document.getElementById('user-nm').textContent='RStudio';    // Set username
  renderFmtPicker();                                             // Populate format picker
  await renderCalBar();                                          // Fetch & render calendars
  const cals=await getCals();                                    // Get calendar list
  if(cals.length>0){                                             // If calendars exist
    activeCal=cals[0].id;                                        // Set first as active
    await openCal(activeCal);                                    // Load its posts
  }
}
```

**If any step fails:**
- renderFmtPicker() fails → Format dropdown stays empty
- renderCalBar() fails → Calendar bar empty (just + button)
- getCals() fails → cals.length = 0, no calendar opens
- openCal() fails → Posts don't load, header stays hidden

---

## Key API Endpoints

The app needs these endpoints to work:

| Endpoint | Purpose | Returns |
|---|---|---|
| `GET /api/clients` | List all clients | Array of client objects |
| `GET /api/calendars` | List all calendars | Array of calendar objects |
| `GET /api/calendars/:id/posts` | Get posts in calendar | Array of post objects |
| `GET /api/refs` | List reference images | Array of reference objects |
| `POST /api/calendars` | Create calendar | Calendar object |
| `PUT /api/calendars/:id/posts/:pid` | Update post (save prompt) | Success response |

**If these are failing:** The test will show HTTP error codes

---

## Critical CSS Issues Found

### overflow:hidden Stack
```css
body { overflow: hidden; }                    /* Line 105 */
.main { overflow: hidden; min-height: 0; }  /* Line 129 */
.col { overflow: hidden; min-height: 0; }   /* Line 130 */
```

**Issue**: If content exceeds viewport and init() fails partway, elements become invisible.

---

## Expected DOM Structure After init()

```
<body>
  <div id="cur"> ... </div>           ← Custom cursor (position:fixed)
  <canvas id="bgc"> ... </canvas>     ← Background animation
  <div class="topbar">                ← Navigation bar
    <div class="logo"> ... </div>
    <div class="nav">                 ← Tab buttons
      <button class="nt act">Generador</button>
      <button class="nt">Clientes</button>
      <button class="nt">Referencias</button>
      <button class="nt">Calendarios</button>
    </div>
    <span id="user-nm">RStudio</span> ← Should show this
  </div>
  <div id="app" style="display:flex"> ← Main container (must be visible)
    <div class="main">                ← Main content area
      <div id="panel-gen" class="panel act"> ← Active panel (generator)
        <div id="calbar">             ← Calendar bar (should have tabs)
        ...
```

---

## Debugging Steps

### 1. Open Browser DevTools (F12)
   - **Console Tab**: Look for red error messages
   - **Network Tab**: Check API response codes
   - **Elements Tab**: Inspect #cur, #app, #calbar for visibility

### 2. Check Console for Errors
   ```
   If you see: 
   - "Cannot read property 'map' of undefined" → getCals() returned undefined
   - "Cannot read property 'length' of undefined" → API response format wrong
   - Network 404 → /api/* endpoints don't exist
   ```

### 3. Check Network Tab
   - Filter by Fetch/XHR
   - Look for `/api/clients`, `/api/calendars`, `/api/refs` requests
   - Check response Status and Body

### 4. Run the Test File
   - Opens test-debug.html
   - Runs comprehensive checks
   - Shows exactly where failures are

---

## What Each Component Does

| Component | File Location | Purpose |
|---|---|---|
| renderFmtPicker() | Lines 1104-1115 | Populate format dropdown with available ratios |
| renderCalBar() | Lines 1152-1156 | Fetch calendars and render tab buttons |
| getCals() | Lines 1056 | Fetch calendar list from /api/calendars |
| openCal() | Lines 1157-1163 | Load calendar posts and render grid |
| init() | Lines 2311-2318 | Initialize app on page load |

---

## Variables to Check in Console

Open browser console and type:
```javascript
// Check if calendars loaded
window.activeCal                  // Should have calendar ID if loaded
await window.getCals()            // Returns calendar array
await window.getClients()         // Returns client array

// Check state
window.AM                         // Active model (e.g., 'nano-banana-2')
window.AF                         // Active format (e.g., 'square_1_1')
window._cache                     // Fetch cache object

// Check localStorage
localStorage.getItem('cliender_kie_key')
localStorage.getItem('cliender_claude_key')

// Inspect DOM
document.getElementById('app').style.display       // Should be 'flex'
document.getElementById('calbar').innerHTML       // Should have buttons
document.getElementById('user-nm').textContent    // Should be 'RStudio'
```

---

## Most Likely Root Cause

Based on code analysis, the issue is almost certainly one of:

1. **API Server Not Running**
   - `/api/calendars` returns 404 or times out
   - init() silently fails
   - No calendars appear

2. **Empty Calendar Database**
   - API returns empty array `[]`
   - init() continues but no calendar opens
   - renderCalBar() renders empty bar

3. **JavaScript Error in init()**
   - openCal() throws exception
   - init() halts mid-execution
   - Cursor tracker may stop working
   - App stays partially initialized

---

## Next Action

Run the test file immediately to identify the exact failure point:

```bash
# In Terminal
open file:///Users/nicolasag/Desktop/RStudio/test-debug.html

# OR if serving via HTTP:
open http://localhost:PORT/test-debug.html
```

The test results will pinpoint exactly which component is failing.
