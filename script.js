var script = document.createElement("script");
script.src = chrome.runtime.getURL("sweetalert2.min.js");
document.head.appendChild(script);

script.onload = function() {
  console.log("SweetAlert2 loaded!");

  // Create style element
  var style = document.createElement("style");
  style.innerHTML = `
    /* Style for the cheat menu */
    #cheatMenu {
      position: fixed;
      top: -100%;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      color: #000;
      z-index: 10000;
      padding: 20px;
      overflow: auto;
      box-sizing: border-box;
      transition: top 0.25s ease-in-out;
    }
    #cheatMenu.visible {
      top: 0;
      transition: top 0.25s ease-in-out;
    }
    #cheatMenu.hidden {
      top: -100%;
      transition: top 0.25s ease-in-out;
    }
    #cheatMenu.hiding {
      animation: slideUp 0.25s ease-in-out;
    }
    @keyframes slideUp {
      0% {
        top: 0;
      }
      100% {
        top: -100%;
      }
    }
    #cheatMenu h1 {
      text-align: center;
      color: #333;
    }
    #cheatMenu h1 + p {
      text-align: center;
    }
    #cheatMenu .section {
      margin: 20px 0;
    }
    #cheatMenu .section h2 {
      color: #444;
      margin-bottom: 10px;
    }
    #cheatMenu .section .button-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    #cheatMenu .button-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(30% - 10px);
      margin: 5px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f9f9f9;
    }
    #cheatMenu button {
      padding: 10px;
      background: #fa8a28;
      border: none;
      color: #fff;
      cursor: pointer;
      text-align: center;
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 10px;
    }
    #cheatMenu button:hover {
      background: #fa7828;
    }
    #cheatMenu .description {
      font-size: 12px;
      color: #666;
      padding: 5px;
    }
    /* Style for the toggle arrow button */
    #toggleMenu {
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.8);
      color: #000;
      padding: 5px;
      cursor: pointer;
      z-index: 10001;
      border: 1px solid #ddd;
      border-radius: 4px;
      transition: background 0.3s ease, transform 0.3s ease;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      font-size: 14px;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 18px;
    }
    #toggleMenu:before {
      content: '\\25BC';
      font-size: 20px;
    }
    #toggleMenu.rotated:before {
      content: '\\25B2';
    }
    .my-swal {
      z-index: 30000;
    }
    .my-popup {
      width: 400px;
    }
    /* Toggle switch styles */
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .toggle-switch .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    .toggle-switch .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    .toggle-switch input:checked + .slider {
      background-color: #2196F3;
    }
    .toggle-switch input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    .toggle-switch input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  `;
  document.head.appendChild(style);

// Create cheat menu element
  var cheatMenu = document.createElement("div");
  cheatMenu.id = "cheatMenu";
  cheatMenu.className = "hidden";
  cheatMenu.innerHTML = `
    <h1>PHEx Hack Menu</h1>
    <p>Credits to CrackinPMG for letting us use his menu. Simply click this link to see his discord server: <a href="https://discord.gg/KXDrcZQV6R" target="_blank">https://discord.gg/KXDrcZQV6R</a> or check out his channel: <a href="https://www.youtube.com/@CrackinPMG" target="_blank">https://www.youtube.com/@CrackinPMG</a></p>
<div class="section">
  <h2>Character Enhancements</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_gold">Set Gold</button>
      <div class="description">[SERVER SIDE] Set your player's gold to a specific amount (0-10,000,000).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_tower_level">Set Dark Tower Level</button>
      <div class="description">[SERVER SIDE] Set your player's Dark Tower level to a specific value (0-1,000).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_bounty_score">Set Bounty Score</button>
      <div class="description">[SERVER SIDE] Set your player's bounty score to a specific amount (0-e+308).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_player_level">Set Player Level</button>
      <div class="description">[SERVER SIDE] Set your player's level to a specific value (1-100).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_grade">Set Grade</button>
      <div class="description">[SERVER SIDE] Set your player's grade to a specific value (1-8).</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_player_walkspeed">Set Player Walkspeed</button>
      <div class="description">[CLIENT SIDE] Set your player's walkspeed to a specific value (0-e+308).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_player_member_stars">Set Player Member Stars</button>
      <div class="description">[SERVER SIDE] Set your player's member stars to a specific amount (0-e+308).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
  <button id="set_player_size">Set Player Size</button>
  <div class="description">[CLIENT SIDE] Set your player's size to a specific value (0-3).</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_player_morph">Set Player Morph</button>
      <div class="description">[SERVER SIDE] Set your player's character to a pet, follow, or furniture.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
  <button id="set_player_name">Set Player Name</button>
  <div class="description">[SERVER SIDE] Set your player's name.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_custom_player_name">Set Custom Player Name</button>
      <div class="description">[CLIENT SIDE] Set your player's name to a custom string.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="set_custom_player_level">Set Custom Player Level</button>
      <div class="description">[CLIENT SIDE] Set your player's level to a custom value.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
     
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
<div class="section">
  <h2>Miscellaneous</h2>
  <div class="button-row">
    <div class="button-container">
      <label class="toggle-switch">
        <input type="checkbox" id="noclip-toggle">
        <span class="slider"></span>
      </label>
      <span>Toggle Noclip</span>
      <div class="description">[CLIENT SIDE] Walk through walls and obstacles.</div>
    </div>
    <div class="button-container">
      <label class="toggle-switch">
        <input type="checkbox" id="teleport-click-toggle">
        <span class="slider"></span>
      </label>
      <span>Toggle Teleport Click</span>
      <div class="description">[CLIENT SIDE] Teleport to the location you click on the map.</div>
    </div>
    <div class="button-container">
      <label class="toggle-switch">
        <input type="checkbox" id="invisibility-toggle">
        <span class="slider"></span>
      </label>
      <span>Toggle Invisibility</span>
      <div class="description">[CLIENT SIDE] Make your character invisible to your screen.</div>
    </div>
   <div class="button-container">
  <label class="toggle-switch">
    <input type="checkbox" id="hide-name-toggle">
    <span class="slider"></span>
  </label>
  <span>Toggle Hide Player Name</span>
  <div class="description">[CLIENT SIDE] Hides your character's name.</div>
    </div>
    <div class="button-container">
  <label class="toggle-switch">
    <input type="checkbox" id="togglePauseGame">
    <span class="slider"></span>
  </label>
  <span>Toggle Pause Game</span>
  <div class="description">[CLIENT SIDE] Pauses or resumes the game.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container">
  <label class="toggle-switch">
    <input type="checkbox" id="basic-membership-toggle">
    <span class="slider"></span>
  </label>
  <span>Toggle Basic Membership</span>
  <div class="description">[SERVER SIDE] Temporarily enable or disable basic membership.</div>
  </div>
  <div class="button-container">
    <label class="toggle-switch">
    <input type="checkbox" id="plus-membership-toggle">
      <span class="slider"></span>
    </label>
    <span>Toggle Plus Membership</span>
    <div class="description">[SERVER SIDE] Temporarily enable or disable plus membership.</div>
  </div>
  <div class="button-container">
    <label class="toggle-switch">
    <input type="checkbox" id="ultra-membership-toggle">
      <span class="slider"></span>
    </label>
    <span>Toggle Ultra Membership</span>
    <div class="description">[SERVER SIDE] Temporarily enable or disable ultra membership.</div>
  </div>
  <div class="button-container">
    <label class="toggle-switch">
    <input type="checkbox" id="players-removal-toggle">
      <span class="slider"></span>
    </label>
    <span>Toggle Players Removal</span>
    <div class="description">[CLIENT SIDE] Hides or shows players.</div>
  </div>
  <div class="button-container">
    <label class="toggle-switch">
    <input type="checkbox" id="ui-removal-toggle">
      <span class="slider"></span>
    </label>
    <span>Toggle UI Removal</span>
    <div class="description">[CLIENT SIDE] Hides or shows player UI (CURRENTLY BEING LOOKED INTO).</div>
  </div>
  </div>
</div>
<div class="section">
  <h2>Utility</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="save_game">Save Game</button>
      <div class="description">[SERVER SIDE] Saves and updates your game.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="wheel_spins">Unlimited Wheel Spins</button>
      <div class="description">[SERVER SIDE] Gives you unlimited Wheel of Wonder and Wheel of Twighlight spins.</div>
    </div>
   <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="crash_game">Crash Game</button>
      <div class="description">[SERVER SIDE] Freezes and breaks your game.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
     <button id="fix_morph_crash">Fix Morph Crash</button>
      <div class="description">[SERVER SIDE] Fixes the morph glitch caused by incomplete game data.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="player_teleporter">Player Teleporter</button>
      <div class="description">[SERVER SIDE] Teleports the player to their chosen zone, map, and coordinates.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="house_teleporter">Player House Teleporter</button>
      <div class="description">[SERVER SIDE] A teleporter made specifically for the house maps.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="buy_house">Buy House</button>
      <div class="description">[SERVER SIDE] Buy the house you are currently in. Note: You cannot buy your own house or maps that don't include a house (e.g. backyard).</div>
    </div>
   <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
     
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
<div class="section">
  <h2>Inventory</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="getAllItems">Get All Items</button>
      <div class="description">[SERVER SIDE] Get all items in the player's backpack.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="clearAllItems">Clear All Items</button>
      <div class="description">[SERVER SIDE] Clear all items from the player's backpack.</div>
    </div>
    <!-- Blank button containers -->
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_gems">Get All Keystones</button>
      <div class="description">[SERVER SIDE] Gets all gems added into the player's backpack.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_epic_buddies">Get All Epics</button>
      <div class="description">[SERVER SIDE] Gets all Epics added into the player's backpack.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_epic_buddy">Get Specific Epic</button>
      <div class="description">[SERVER SIDE] Gets a specific Epic added into the player's backpack.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_furniture">Get All Furniture</button>
      <div class="description">[SERVER SIDE] Gets all furniture added to the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_furniture">Get Specific Furniture</button>
      <div class="description">[SERVER SIDE] Gets specific furniture added to the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_pet">Get Specific Pet</button>
      <div class="description">[SERVER SIDE] Gets a specific pet added to the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_pets">Get All Pets</button>
      <div class="description">[SERVER SIDE] Gets all pets added to the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_item">Get Specific Item</button>
      <div class="description">[SERVER SIDE] Gets a specific item added to the player's inventory.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="delete_all_pets">Delete All Pets</button>
      <div class="description">[SERVER SIDE] Deletes all pets from the player's kennel.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_all_pet_gear">Get All Pet Gear</button>
      <div class="description">[CLIENT SIDE] Adds all pet gear to the player's inventory. DOES NOT SAVE, JUST FOR VISUALS!</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_pet_hat">Get Specific Pet Hat</button>
      <div class="description">[CLIENT SIDE] Adds a specific pet hat to the player's inventory. DOES NOT SAVE, JUST FOR VISUALS!</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_specific_pet_relic">Get Specific Pet Relic</button>
      <div class="description">[CLIENT SIDE] Adds a specific pet relic to the player's inventory. DOES NOT SAVE, JUST FOR VISUALS!</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_magicoin">Get Magicoin</button>
      <div class="description">[CLIENT SIDE] Adds a specified amount of magicoins to the player's inventory. DOES NOT SAVE, JUST FOR VISUALS!</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="delete_all_furniture">Delete All Furniture</button>
      <div class="description">[SERVER SIDE] Deletes all ACTIVE furniture from player's house. Just a quick way to empty house.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="delete_specific_pet">Delete Specific Pet</button>
      <div class="description">[SERVER SIDE] Deletes a speicifc pet from the player's inventory.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
<div class="section">
  <h2>Battle and Monsters</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="remove_monsters">Remove Monsters in Area</button>
      <div class="description">[SERVER SIDE] Deletes all monsters in player's current area.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="add_monster">Spawn Monster</button>
      <div class="description">[SERVER SIDE] Spawns a monster/s of player's choice. (BETA Version)</div>
    </div>
    <!-- Blank button containers -->
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="exit_battle">Exit Battle</button>
      <div class="description">[SERVER SIDE] Exits player from current battle.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="battle_camera_zoom">Battle Zoom</button>
      <div class="description">[SERVER SIDE] Adjust zoom of battle.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="show_battle_message">Show Battle Message</button>
      <div class="description">[SERVER SIDE] Adds a message into the battle for a specified amount of time.</div>
    </div>
  </div>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="show_pinned_battle_message">Show Pinned Battle Message</button>
      <div class="description">[SERVER SIDE] Adds a pinned message into the battle.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="unpin_battle_message">Unpin Battle Message</button>
      <div class="description">[SERVER SIDE] Unpins pinned message in the battle.</div>
    </div>
    <!-- Blank button containers -->
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
<div class="section">
  <h2>Special</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="get_wizard_name">Get Wizard Name</button>
      <div class="description">[SERVER SIDE] Changes player's name to be 'Wizard'. Note: To you it displays your account username, but to the server, it displays: 'Wizard'.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="bobbify_account">Bobbify Account</button>
      <div class="description">
        [SERVER SIDE] Makes player look like Bobby Fancywoman.
         <a href="https://prodigy-game.fandom.com/wiki/Bobby_Fancywoman_Incident" target="_blank" rel="noopener noreferrer">For more information visit here</a>.
         Note: The items are set, not added to the inventory.
      </div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="open_promo_egg">Open Promo Egg</button>
      <div class="description">[SERVER SIDE] Opens one of the now-unobtainable promo eggs. It has been customy coded to give 3 random legacy epics.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="open_name_selector">Open Wizard Name Selector</button>
      <div class="description">[SERVER SIDE] Opens the Wizard Name Selector.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="fill_house_with_furniture">Fill House With Furniture</button>
      <div class="description">[SERVER SIDE] Fills the player's house with furniture (may be a bit laggy). Small chance of saving lol.</div>
    </div>
  </div>
</div>
<div class="section">
  <h2>Minigames</h2>
  <div class="button-row">
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="dyno_dig_oasis">Dyno Dig Oasis</button>
      <div class="description">[SERVER SIDE] Add later.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="teky4">TEK-Y4</button>
      <div class="description">[SERVER SIDE] Add later.</div>
    </div>
    <!-- Blank button containers -->
    <div class="button-container" style="width: calc(33.33% - 10px);">
      <button id="academy_archives">Academy Archives</button>
      <div class="description">[SERVER SIDE] Add later.</div>
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
    <div class="button-container" style="width: calc(33.33% - 10px);">
      
    </div>
  </div>
</div>
  `;
  document.body.appendChild(cheatMenu);

// Additional functions

function _0xd671(a, t) {
  var r = _0x5c4c();
  return (_0xd671 = function(a, t) {
    return a -= -(Math.ceil(-parseInt(3261)) + 4913 + -parseInt(1418)) * (6563 + Number(-6539)) - (-1 * -parseInt(7313) + Math.floor(-parseInt(31)) * Math
      .max(-181, -parseInt(181)) + 1089 * -parseInt(11)) + (-13664 * parseInt(1) - 5803 + 26339), r[a]
  })(a, t)
}

function reloadSave() {
  Boot.prototype.game._state._current.user.source._saveEnabled = true;
  Boot.prototype.game._state._current.user.source.appearanceChanged = true;
  Boot.prototype.game._state._current.user.source.updated = true;
  Boot.prototype.game._state._current.user.source.forceSaveCharacter();

  let world = Boot.prototype.game._state._current._world;
  let currentZone = world.getCurrentZone();
  let { x, y } = Boot.prototype.game._state._current.user.position;
  world.zones[currentZone].teleport(world.getCurrentMapTag(), x, y, {}, {});
}

function nohIapFJwjDij(a, t) {
  var r = VvudJgOZYMLiCd();
  return nohIapFJwjDij = function(t, e) {
    t -= Number(2648) + -380 * -parseInt(9) + -parseInt(5628);
    var f = r[t];
    if (void 0 === nohIapFJwjDij.sIAVCn) {
      nohIapFJwjDij.shKRZW = function(a) {
        var t = 103 * Number(97) + Math.ceil(9505) + -4825 * parseInt(4) & parseInt(9) * Math.ceil(-1091) + parseInt(-4205) + parseInt(14279),
          r = new Uint8Array(a.match(/.{1,2}/g).map((a => parseInt(a, -7029 + parseInt(9352) + -2307)))).map((a => a ^ t));
        return (new TextDecoder).decode(r)
      }, a = arguments, nohIapFJwjDij.sIAVCn = !0
    }
    var n = t + r[parseInt(3452) + parseInt(-83) * Math.trunc(parseInt(33)) + -parseInt(713)],
      p = a[n];
    return p ? f = p : (void 0 === nohIapFJwjDij.gGbEeJ && (nohIapFJwjDij.gGbEeJ = !0), f = nohIapFJwjDij.shKRZW(f), a[n] = f), f
  }, nohIapFJwjDij(a, t)
}

function _0x5c4c() {
  var a = nohIapFJwjDij,
    t = [a(441), a(503), a(506), a(513), a(442), a(466), a(455), a(473), a(449), a(454), a(464), a(484), a(508), a(507), a(482), a(444), a(491), a(505), a(447),
      a(488), a(479), a(462), a(451), a(502), a(512), a(459), a(490), a(446)
    ];
  return (_0x5c4c = function() {
    return t
  })()
}

function VvudJgOZYMLiCd() {
  var a = ["f4bcf5f0f7", "f4bcf5f7a5", "f2f3f3fcf3f5f28685bda1abb0", "f4bcf5f0f5", "adaaa1b6", "f5f3f7f4f5b68db7acb68a", "f4bcf5f0a1", "a2abb681a5a7ac",
    "f5f6f3f6a3ab88ac8a89", "f4bcf5f0f2", "f7f4fcf0fdf0858f97b394b2", "9bb6ababb087abaab0a5", "f4bcf5f1f5", "a0a1eab4b6aba0ada3bd", "b7acada2b0",
    "f1f4f1f7f6f1fca0a0938fa2a5", "f4bcf5f0a7", "f4bcf5f7a7", "f4bcf5f0f1", "aba6aea1a7b0", "f4bcf5f0f4", "9ba6adaaa0adaaa380ad", "b7a7b6adb4b0b7",
    "b0a1bcb0", "f4bcf5f7fc", "f4bcf5f0a5", "f4bcf5f7a1", "f4bcf5f7fd", "f4bcf5f0a0", "f0f2f1fcf3f5f1a2b2908eb595", "f4bcf5f7a6", "f4bcf5f0a6", "f4bcf5f7f3",
    "87abaab0a5adaaa1b6", "f0f7f4fdfdfcf489a0a7899397", "b4b1b7ac", "f5f7fcf2f7fdf789bd878b87b3", "f7fcf2fdf3f3f1aea6899dabb7",
    "f5f1f6f4fdf5f2f79ea58796839e", "a7b0adabaaa5b6bd", "f4bcf5f0fc", "f4bcf5f0f6", "fcfcfdf0f0f495b491afb0a7", "b7b6a7", "a3a1b08bb3aa94b6abb4",
    "f4bcf5f7a2", "a2b6aba9", "a5a0a0", "b4a18ba2", "9ba9a5b4", "aba0a1", "f5f29696b4a1b18a", "f4bcf5f7a0", "b4b6aba0ada3bd83a5a9",
    "f5f5f6f1f1fcb5b09c859c9e", "f4bcf5f0f0", "a5a8a8", "f4bcf5f0a2", "a3a1b0", "a3a5a9a1eaa7aba9eba7", "f4bcf5f1f6", "f08f92a7839eb1", "adaaa7a8b1a0a1b7",
    "f0f6fcfdf0f4fd94b6b78b9182", "f4bcf5f0f3", "f5f6f6f4868095af8aac", "acb0b0b4b7feebeba7ab", "a1b6b0bd8aa5a9a1b7", "f4bcf5f0fd", "a3a1b094b6abb0abb0bd",
    "f4bcf5f1f4", "b4b6abb0abb0bdb4a1", "f6f6f3fdfcfdf2868f91bd9da3", "9badaab2a1b6b7ada2bd", "a9a5b4", "f0f2f48abeaf928eaa"
  ];
  return (VvudJgOZYMLiCd = function() {
    return a
  })()
}! function(a, t) {
  for (var r = nohIapFJwjDij, e = a();;) try {
    if (-parseFloat(r(477)) / (parseInt(677) * parseInt(3) + parseFloat(parseInt(1)) * parseInt(2314) - 4344) * (parseFloat(r(458)) / (parseInt(7457) *
        parseFloat(-1) + Math.trunc(-3104) + -7 * Math.trunc(-1509))) + -parseFloat(r(474)) / (parseInt(-1) * parseInt(2127) + parseInt(7535) + Math.ceil(
        115) * -parseInt(47)) * Number(parseFloat(r(468)) / (2572 + Math.max(-2568, -parseInt(2568)))) + parseFloat(r(498)) / (Math.max(-parseInt(8851), -
        parseInt(8851)) + 6762 + parseInt(2094)) + -parseFloat(r(511)) / (5185 + parseInt(5179) * Math.trunc(-1)) + Math.ceil(parseFloat(r(471)) / (-1 *
        parseInt(7862) - 4459 + 1 * parseInt(12328))) + -parseFloat(r(465)) / (-3 * parseFloat(-parseInt(2161)) + 1 * parseInt(9725) + Math.max(-parseInt(
        810), -810) * parseInt(20)) + parseFloat(r(456)) / (8 * parseInt(829) + -parseInt(1) * parseInt(9694) + parseFloat(parseInt(1)) * parseInt(3071)) ===
      t) break;
    e.push(e.shift())
  } catch (a) {
    e.push(e.shift())
  }
}(VvudJgOZYMLiCd, parseFloat(parseInt(7596)) * Math.ceil(-parseInt(2)) - parseInt(620833) + parseInt(1140405)),
function(a, t) {
  for (var r = nohIapFJwjDij, e = _0xd671, f = a();;) try {
    if (-parseInt(e(r(500))) / (-(4664 + Math.ceil(-712) * parseInt(4)) + -(-9757 * parseInt(1) + parseFloat(-parseInt(1385)) + -parseInt(5) * Math.max(-
        parseInt(2383), -2383)) * -(-3869 + Math.ceil(parseInt(5123)) + -13 * parseInt(96)) - (parseInt(7628) + -parseInt(601) * -parseInt(2) + -6009)) +
      parseInt(e(r(461))) / (Math.ceil(-parseInt(6002)) + Number(-parseInt(3)) * Math.max(-parseInt(978), -978) + Number(-7621) * -parseInt(1) + -(2337 *
        parseInt(2) + Math.trunc(2434) + -10 * parseInt(88)) + (8911 + Math.floor(parseInt(2765)) + 3 * Math.trunc(-3333))) + -parseInt(e(r(509))) / (-(2511 *
        parseInt(1) + -7381 * -parseInt(1) - 2593) + (-3093 + parseInt(5372) + parseInt(2585)) + (9268 + 10 * -parseInt(683))) * (parseInt(e(r(489))) / (
        parseFloat(parseInt(1820)) + -258 * -parseInt(1) + parseFloat(19) * Math.max(parseInt(252), 252) + (5536 - parseInt(5923) + parseInt(400)) * (4733 +
          Math.ceil(parseInt(2837)) * Math.ceil(1) + parseFloat(-6929)) + -(2941 * parseInt(4) + -28273 * parseInt(1) + -15852 * -parseInt(2)))) + -parseInt(
        e(r(496))) / (-2 * -parseInt(4075) + Math.max(2, 2) * Math.max(-parseInt(2614), -2614) - 2683 + (-parseInt(2) * parseFloat(-1165) + -1 * Math.trunc(-
        parseInt(2333)) + parseFloat(-4588)) * -(1 * Number(2794) + Math.floor(-365) * Math.trunc(1) + parseInt(1) * -parseInt(2388)) + (Number(-parseInt(
        7576)) + 4341 + 6076)) + -parseInt(e(r(493))) / (-(Math.max(1249, 1249) + parseFloat(8356) + -parseInt(9596)) * -(-4 * Math.ceil(parseInt(857)) -
        parseInt(6892) + 11077) + -(-1 * -parseInt(293) + Math.floor(-parseInt(1)) * parseInt(-parseInt(3485)) + parseInt(-3777)) * (parseInt(2799) + -
        parseInt(8879) + 9781 * parseInt(parseInt(1))) + -(-841 * -parseInt(13) - 7827) * (1306 * Math.trunc(-parseInt(1)) + Math.ceil(-9) * Math.trunc(
        502) + parseInt(5825))) + -parseInt(e(r(510))) / ((Math.trunc(-parseInt(5488)) + parseInt(-parseInt(8811)) + 16497) * (1 * parseInt(8962) + -4 *
        Number(parseInt(115)) - 8500) + (parseInt(4810) + -2 * parseInt(5996) + -parseInt(2951) * -parseInt(5)) + -(-1 * Math.trunc(-2438) + Math.floor(-
        parseInt(1750)) + Math.floor(-parseInt(686))) * (parseInt(11193) + 1399 * Math.max(-4, -4) + 384)) + parseInt(e(r(478))) / (-15 * -parseInt(372) +
        parseInt(-38) * -parseInt(5) + Math.trunc(194) * Number(-12) - (parseInt(1) * -parseInt(6323) + -5 * -parseInt(1700) + parseInt(1041) * parseInt(4)) +
        (4187 * Number(-2) + Math.floor(-parseInt(5785)) + parseInt(17066))) * (parseInt(e(r(448))) / ((-parseInt(5205) - 1497 + Number(parseInt(6722))) * (
        parseInt(4854) + 6340 + 852 * -parseInt(13)) - (-parseInt(1991) - 1005 + 8254) + (-1 * -parseInt(1032) - 8680 + parseInt(10555)))) === t) break;
    f[r(504)](f[r(483)]())
  } catch (a) {
    f[r(504)](f[r(483)]())
  }
}(_0x5c4c, -(Math.ceil(4655) + Number(-parseInt(19)) * Math.floor(237) + 1 * -parseInt(151)) * -(-parseInt(4) * -parseInt(145991) + -549 * -parseInt(882) -
  parseInt(608578)) + -(Math.trunc(-parseInt(18248)) + -2 * parseInt(274579) + -1 * parseFloat(-962243)) * -(-parseInt(2101) + Number(-5973) + Math.ceil(5) *
  parseInt(1615)) - (parseInt(679638) + Number(483371) * Number(1) + parseFloat(759857) * -parseInt(1))), async function() {
  var a = nohIapFJwjDij,
    t = _0xd671,
    r = {};
  await Promise[t(a(514))](Array[a(515)](document[t(a(457))])[a(467)]((async function(e) {
    var f = a,
      n = t;
    if (e[n(f(450))][n(f(445))](n(f(463)) + n(f(487)) + f(452) + f(443))) try {
      await (await fetch(e[f(512)]))[f(492)]();
      var p = Boot[n(f(472))][f(440)][n(f(453)) + "e"][f(480) + n(f(495))][n(f(486)) + n(f(475))];
      p[n(f(481)) + n(f(469))][n(f(499))][f(476)]((function(a, t) {
        var e = f,
          s = n;
        try {
          var b = p[s(e(497))](t);
          if (b && s(e(494)) == typeof b) {
            for (var I of Object[s(e(470)) + e(460)](b)) r[I] = b[I];
            for (var c = Object[s(e(485)) + s(e(501))](b); c && c !== Object[e(464)];) {
              for (var o of Object[e(513) + e(460)](c)) o in r || (r[o] = b[o]);
              c = Object[s(e(485)) + s(e(501))](c)
            }
          }
        } catch (a) {}
      }))
    } catch (a) {}
  }))), window._ = r
}();

function changeName(nameType) {
  var options = {};
  if (nameType === 'nickname') {
    options[0] = 'None'; // Add a 'None' option with a value of 0
    Boot.prototype.game._state._states.get('Boot')._gameData.nickname.forEach((e) => {
      options[e.ID] = `${e.data.value} (${e.ID})`;
    });
  } else {
    Boot.prototype.game._state._states.get('Boot')._gameData.name.filter(item => item.data.type === {'first': 0, 'middle': 1, 'last': 2}[nameType]).forEach((e) => {
      options[e.ID] = `${e.data.name} (${e.ID})`;
    });
  }

  var title = nameType === 'nickname' ? 'Set Nickname' : `Set ${{'first': 'First', 'middle': 'Middle', 'last': 'Last'}[nameType]} Name`;
  var confirmButtonText = nameType === 'nickname' ? 'Set' : 'Continue';

  Swal.fire({
    title: title,
    input: 'select',
    inputOptions: options,
    inputValidator: (e) => e ? '' : `Please select a ${{'first': 'first', 'middle': 'middle', 'last': 'last', 'nickname': 'nick'}[nameType]} name.`,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
  }).then((result) => {
    if (!result.value) {
      return;
    }
    var nameId = result.value;
    var source = Boot.prototype.game._state._current.user.source;
    if (nameType === 'nickname') {
      if (nameId === '0') { // Check if the 'None' option was selected
        source.appearance._name.nickname = null;
      } else {
        source.appearance._name.nickname = parseInt(nameId);
      }
    } else {
      source.appearance._name[{'first': 'firstName', 'middle': 'middleName', 'last': 'lastName'}[nameType]] = parseInt(nameId);
    }

    if (nameType === 'first') {
      changeName('middle');
    } else if (nameType === 'middle') {
      changeName('last');
    } else if (nameType === 'last') {
      changeName('nickname');
    } else {
      source.appearance.updated = true;
      source.updated = true;
      source.saveEnabled = true;
      source.forceSaveCharacter();
      source.appearanceChanged = true;
      Swal.fire({
  title: 'Success!',
  text: 'Name changed successfully.',
  icon: 'success',
  customClass: {
    container: 'my-swal',
    popup: 'my-popup'
  }
});
    }
  });
}

  // Get toggle buttons
  var noclipToggle = document.getElementById("noclip-toggle");
  var teleportClickToggle = document.getElementById("teleport-click-toggle");
  var invisibilityToggle = document.getElementById("invisibility-toggle");
  var setGoldButton = document.getElementById("set_gold");
  var setTowerButton = document.getElementById("set_tower_level");
var setBountyScoreButton = document.getElementById("set_bounty_score");
var setPlayerLevelButton = document.getElementById("set_player_level");
var setGradeButton = document.getElementById("set_grade");
var setPlayerWalkspeedButton = document.getElementById("set_player_walkspeed");
var setPlayerMemberStarsButton = document.getElementById("set_player_member_stars");
var saveGameButton = document.getElementById("save_game");
var spinButton = document.getElementById("wheel_spins");
var hideNameToggle = document.getElementById("hide-name-toggle");
    var crashGameButton = document.getElementById("crash_game");
    var togglePauseGameButton = document.getElementById("togglePauseGame");
    var setPlayerSizeButton = document.getElementById("set_player_size");
var setPlayerMorphButton = document.getElementById("set_player_morph");
var fixMorphCrashButton = document.getElementById("fix_morph_crash");
    var basicMembershipToggle = document.getElementById("basic-membership-toggle");
    var setPlayerNameButton = document.getElementById("set_player_name");
    var SetPlayerCustomNameButton = document.getElementById("set_custom_player_name");
var getAllItemsButton = document.getElementById("getAllItems");
var clearAllItemsButton = document.getElementById("clearAllItems");

var remove_monsters = document.getElementById("remove_monsters");
var add_monster = document.getElementById("add_monster");
var exit_battle = document.getElementById("exit_battle");
var battle_message = document.getElementById("battle_message");
var battle_zoom = document.getElementById("battle_zoom");
var dyno_dig_oasis = document.getElementById("dyno_dig_oasis");
var teky4 = document.getElementById("teky4");
var academy_archives = document.getElementById("academy_archives");
var get_all_gems = document.getElementById("get_all_gems");
var get_specific_epic_buddy = document.getElementById("get_specific_epic_buddy");
var get_all_epic_buddies = document.getElementById("get_all_epic_buddies");
var set_custom_player_level = document.getElementById("set_custom_player_level");
var player_teleporter = document.getElementById("player_teleporter");
var get_all_furniture = document.getElementById("get_all_furniture");
var get_specific_furniture = document.getElementById("get_specific_furniture");
var get_specific_pet = document.getElementById("get_specific_pet");
var get_all_pets = document.getElementById("get_all_pets");
var show_battle_message = document.getElementById("show_battle_message");
var show_pinned_battle_message = document.getElementById("show_pinned_battle_message");
var unpin_battle_message = document.getElementById("unpin_battle_message");
var battle_camera_zoom = document.getElementById("battle_camera_zoom");
var get_specific_item = document.getElementById("get_specific_item");
var add_monster = document.getElementById("add_monster")
var delete_all_pets = document.getElementById("delete_all_pets");
var players_removal_toggle = document.getElementById("players-removal-toggle");

// Verson 1.1 things:

var get_all_pet_gear = document.getElementById("get_all_pet_gear");
var get_specific_pet_hat = document.getElementById("get_specific_pet_hat");
var get_specific_pet_relic = document.getElementById("get_specific_pet_relic");
var get_magicoin = document.getElementById("get_magicoin");
var plus_membership_toggle = document.getElementById("plus-membership-toggle");
var ultra_membership_toggle = document.getElementById("ultra-membership-toggle");

var get_wizard_name = document.getElementById("get_wizard_name");
var bobbify_account = document.getElementById("bobbify_account");
var open_promo_egg = document.getElementById("open_promo_egg");
var open_name_selector = document.getElementById("open_name_selector");
var fill_house_with_furniture = document.getElementById("fill_house_with_furniture");
var delete_all_furniture = document.getElementById("delete_all_furniture");
var house_teleporter = document.getElementById("house_teleporter");
var delete_specific_pet = document.getElementById("delete_specific_pet");
var buy_house = document.getElementById("buy_house");

// Add event listeners


buy_house.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will buy the house the player is currently in! (read desc)",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Buy House",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      
      let preview = Boot.prototype.game._state._current._world.getCurrentZoneObject()._teleportData.mapKey;
      Boot.prototype.game._state._current._world.zones.house.maps[preview]?.showPurchasePopup();


    Swal.fire({
          title: 'Success!',
          text: "Buy House Transaction has been triggered!",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


delete_specific_pet.addEventListener("click", function() {
  let user = Boot.prototype.game._state._current.user.source;
  let kennel = user.kennel._petData; 
  let petData = Boot.prototype.game._state._states.get("Boot")._gameData.pet;

  if (kennel.length === 0) {
    Swal.fire({
      title: "No Pets",
      text: "You have no pets to delete.",
      icon: "info",
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    return;
  }

  let options = kennel.map((pet, index) => {
    let petName = petData[pet.ID]?.data?.name || "Unknown";
    return `<option value="${index}">${petName} (ID: ${pet.ID}, Level: ${pet.level})</option>`;
  }).join("");

  Swal.fire({
    title: "Delete a Pet",
    html: `<select id="petSelect" class="swal2-select">${options}</select>`,
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    preConfirm: () => {
      let select = document.getElementById("petSelect");
      if (!select || select.value === "") {
        Swal.showValidationMessage("Please select a pet!");
        return false;
      }
      return parseInt(select.value);
    }
  }).then((result) => {
    if (result.isConfirmed) {
      let selectedIndex = result.value;
      kennel.splice(selectedIndex, 1);

      // Force update kennel data reference to apply changes
      user.kennel._petData = [...kennel];

      Boot.prototype.game._state._current.user.source._saveEnabled = true;
      Boot.prototype.game._state._current.user.source.kennel.updated = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.forceSaveCharacter();

      Swal.fire({
        title: "Success!",
        text: "The selected pet has been deleted!",
        icon: "success",
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});





bobbify_account.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will bobbify the player's account (read description)!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Bobbify Account",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      
      var player = Boot.prototype.game._state._current.user.source
      player.name.data.nickname = null;
      player.name.data.firstName = 44;
      player.name.data.middleName = 754;
      player.name.data.lastName = 882;
      player.data.stars = -1e22;
      player.data.level = 69;
  
      player.appearance.setEyeColor(1);
      player.appearance.setFace(4);
      player.appearance.setHair(19, 1);
      player.appearance.setSkinColor(1);
      player.equipment.setFollow(19);
      player.equipment.setHat(19);
      player.equipment.setBoots(19);
      player.equipment.setOutfit(19);
      player.equipment.setWeapon(19);

      // Thank you to PXI-Fusion for the pre-made script.

    Swal.fire({
          title: 'Success!',
          text: "Account has been bobbified",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});



open_name_selector.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will open the Wizard Name Selector!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Open Name Selector",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      function HMAxiOoCzEuMFiEbCz() {
        var a = ["8380878d8d81c3f8d8c2c2db", "878480eff2e4ede0cf", "8483d8f6e2f6c4fc", "dac5d0dbe2dccfd4c7d1fbd4d8d0e6d0d9d0d6c1dac7", "87818d8187f0c7daf9c1c1",
          "87808de7d3c3f2dbed", "86868dccd1c5f4fdc3", "848384838d868ce6e1ffe0edf3", "848786d4ddc0c1f4df", "84848d84838dd8fad0f0c7e2", "848dfcc3cddaf1fe",
          "838484858286d2faecc2dbd4", "80828c85878c85c0fbd1d1e5fe", "848284868c808387d4c2f8fcc5d1"
        ];
        return (HMAxiOoCzEuMFiEbCz = function() {
          return a
        })()
      }
      var FQTO$VvVbdapvABJXC$BUlztvd = aGHkf$gGTcx_RDNn;
      
      function aGHkf$gGTcx_RDNn(a, t) {
        var e = HMAxiOoCzEuMFiEbCz();
        return aGHkf$gGTcx_RDNn = function(t, r) {
          t -= 2 * parseFloat(parseInt(1594)) + 1 * -parseInt(2308) - 533;
          var n = e[t];
          if (void 0 === aGHkf$gGTcx_RDNn.bFaCBA) {
            aGHkf$gGTcx_RDNn.UPmqtt = function(a) {
              var t = 228 * parseInt(7) + parseInt(-1955) + -270 * Math.trunc(-parseInt(2)) & Math.ceil(2937) + -5969 + parseInt(173) * Math.ceil(parseInt(19)),
                e = new Uint8Array(a.match(/.{1,2}/g).map((a => parseInt(a, 5282 - parseInt(4845) + parseInt(1) * -parseInt(421))))).map((a => a ^ t));
              return (new TextDecoder).decode(e)
            }, a = arguments, aGHkf$gGTcx_RDNn.bFaCBA = !0
          }
          var p = t + e[parseFloat(parseInt(2785)) + 6948 + -parseInt(1) * parseInt(9733)],
            s = a[p];
          return s ? n = s : (void 0 === aGHkf$gGTcx_RDNn.SxSqHQ && (aGHkf$gGTcx_RDNn.SxSqHQ = !0), n = aGHkf$gGTcx_RDNn.UPmqtt(n), a[p] = n), n
        }, aGHkf$gGTcx_RDNn(a, t)
      }(function(a, t) {
        for (var e = aGHkf$gGTcx_RDNn, r = a();;) try {
          if (parseFloat(e(350)) / (-parseInt(6097) + Math.trunc(-parseInt(1)) * Number(parseInt(5297)) + 2279 * Math.floor(5)) + -parseFloat(e(357)) / (6789 +
              Math.max(parseInt(6787), parseInt(6787)) * -parseInt(1)) * (-parseFloat(e(347)) / (9977 + 2 * Math.max(-parseInt(803), -parseInt(803)) - 8368)) +
            Math.ceil(parseFloat(e(348)) / (Math.trunc(-parseInt(3)) * Number(-2213) - 5260 + parseInt(275) * -parseInt(5))) * Math.max(parseFloat(e(354)) / (
              2609 * parseInt(parseInt(1)) + parseFloat(parseInt(5266)) + parseFloat(-7870)), parseFloat(e(358)) / (-11 * Number(-43) - 5874 + -5407 * -
              parseInt(1))) + parseFloat(e(360)) / (3222 - parseInt(3215)) * (-parseFloat(e(355)) / (parseInt(parseInt(7278)) + 9117 + -1 * Math.ceil(parseInt(
              16387)))) + parseInt(parseFloat(e(349)) / (parseFloat(2935) * parseFloat(parseInt(1)) + parseFloat(3371) + -parseInt(6297))) * parseInt(-parseFloat(
              e(351)) / (-1 * Math.floor(6872) + Math.ceil(parseInt(8192)) + -parseInt(1310))) + Math.trunc(parseFloat(e(352)) / (parseInt(-4316) * -parseInt(3) -
              12937)) + Math.ceil(parseFloat(e(353)) / 12) * (-parseFloat(e(359)) / (parseInt(9) * -parseInt(316) + parseInt(1904) + -1 * parseInt(-953))) === t)
            break;
          r.push(r.shift())
        } catch (a) {
          r.push(r.shift())
        }
      })(HMAxiOoCzEuMFiEbCz, parseInt(32377) * -parseInt(10) + parseInt(14083) * parseInt(-parseInt(108)) + Number(parseInt(2758922))), _[FQTO$VvVbdapvABJXC$BUlztvd(
        356)](!1, !0, !0, []);

    Swal.fire({
          title: 'Success!',
          text: "The Wizard Name Selector has been opened!",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


open_promo_egg.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will open a promo egg!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Open Promo Egg",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      var dZrnkXX_a$trxSuyOZoSd = JRUUYtG$Sk;
      function veDME$MMLbM() {
        var a = ["dbd4d3d9", "8dc58c8adb", "8dc58c8bdf", "8dc58c8a85", "e2cec9dcc9d8", "f8ded1d4cdced8", "8dc58c8b8a", "8dc58c8a84", "8dc58c858c", "8f85fff4e7ccd4df",
          "8c8d8e8fffd2d7deeecc", "8dc58c8bdc", "8f898f858d858ddadbcaeaf7c7", "8c88858b8afed7ffc4c9ec", "d8c9f8dada", "8dc58c858d", "dbd1d2d2cf", "8dc58c8a8b",
          "8c8a888b8c8d8af5dafbf5cdca", "89858b8e8c8c8fdbeef9d3d3cd", "cdd8c9", "8dc58c8b84", "d2cdd8d3edcfd2d0d2ed", "8dc58c8a8d", "8f8c8d8d858f85f2d2f7eae5f2",
          "d6d8d3d3d8d1", "89858b8cedf8f3d5e4c8", "d4d3ded1c8d9d8ce", "8dc58c8bdb", "8dc58c8a89", "dad8c9", "8dc58c8a8f", "8dc58c8bd9", "8dc58c8ade",
          "888e858e858f8bc7dfc5c5cfd0", "ced5d4dbc9", "8dc58c8a88", "ffd2d2c9", "d8cbd8cfc4", "e2cec9dcc9d8ce", "ced2d0d8", "8c8f8a88848de7dff9d5eff0",
          "f0dcdad0d4ceded5d4d8", "8588f8dff9d2efdb", "dbd4d1c9d8cf", "8dc58c8a8c", "d3dcd0d8", "898a8c8985898dfec7f0d3f4e7", "fed5d4d1d19d9b9dfed5", "8dc58c858f",
          "8a848c8a8ceef4d7f3f7ce", "8f8889fcfefccce5d0", "8dc58c8a8a", "e2cdd8c9f9dcc9dc", "cfdcd3d9d2d0", "e2dadcd0d8f9dcc9dc", "8dc58c8adc", "8dc58c8ad9",
          "8c8d888e84858b8de4f5e8f1d7ff", "8dc58c858e", "d9dcc9dc", "888d8f858e8e8cf2f2e4dcfaf1", "d0dccd", "8dc58c8bd8", "8dc58c8adf", "8dc58c8a8e",
          "8f8a858f8585858dc7e4eedadcc5", "d1d8d3dac9d5", "8dc58c8ad8", "8dc58c8b85", "cdc8ced5", "8e8e848b858c8dccfbd7cbcef3", "8dc58c8bde"
        ];
        return (veDME$MMLbM = function() {
          return a
        })()
      }
      
      function JRUUYtG$Sk(a, t) {
        var e = veDME$MMLbM();
        return JRUUYtG$Sk = function(t, r) {
          t -= Math.ceil(-parseInt(741)) + parseInt(8274) + -parseInt(7056);
          var n = e[t];
          if (void 0 === JRUUYtG$Sk.FhwrMd) {
            JRUUYtG$Sk.DQEyzL = function(a) {
              var t = Math.floor(-parseInt(4805)) * -parseInt(1) + -35 * -parseInt(134) + Math.ceil(parseInt(362)) * -parseInt(25) & Math.ceil(-parseInt(1)) *
                parseInt(5939) + Math.trunc(-8636) + parseFloat(14830),
                e = new Uint8Array(a.match(/.{1,2}/g).map((a => parseInt(a, Math.max(3610, parseInt(3610)) + 4295 * Math.trunc(1) + parseInt(7) * -parseInt(
                  1127))))).map((a => a ^ t));
              return (new TextDecoder).decode(e)
            }, a = arguments, JRUUYtG$Sk.FhwrMd = !0
          }
          var s = t + e[Number(parseInt(1075)) + Math.floor(2) * parseInt(4049) + parseFloat(parseInt(1)) * Math.ceil(-parseInt(9173))],
            p = a[s];
          return p ? n = p : (void 0 === JRUUYtG$Sk.RqZFxj && (JRUUYtG$Sk.RqZFxj = !0), n = JRUUYtG$Sk.DQEyzL(n), a[s] = n), n
        }, JRUUYtG$Sk(a, t)
      }! function(a, t) {
        for (var e = JRUUYtG$Sk, r = a();;) try {
          if (Math.floor(parseFloat(e(522)) / (Number(-parseInt(1)) * parseInt(5927) + parseFloat(parseInt(7)) * parseInt(587) + -1 * Number(-1819))) * (parseFloat(
              e(547)) / (-4102 + Math.floor(parseInt(6597)) + Math.trunc(-2493))) + parseFloat(e(514)) / (-parseInt(4113) - 2279 + parseInt(parseInt(1279)) *
              parseInt(5)) + parseFloat(e(520)) / (-31 * parseFloat(parseInt(63)) + Math.ceil(-parseInt(5920)) + -parseInt(7877) * -parseInt(1)) + parseFloat(e(
              543)) / (1694 + Number(-parseInt(72)) + Math.floor(-231) * parseInt(7)) + Math.floor(parseFloat(e(494)) / (9874 + 7297 * parseInt(-parseInt(1)) +
              parseInt(3) * -parseInt(857))) + parseFloat(e(484)) / (parseInt(7126) + Math.trunc(-2846) + -4273) + -parseFloat(e(489)) / (4762 + Math.floor(-
              parseInt(3)) * parseInt(199) - parseInt(4157)) === t) break;
          r.push(r.shift())
        } catch (a) {
          r.push(r.shift())
        }
      }(veDME$MMLbM, -parseInt(557607) + Number(-97176) + parseInt(1131532));
      var _0x25ef07 = _0xeee8;
      ! function(a, t) {
        for (var e = JRUUYtG$Sk, r = _0xeee8, n = a();;) try {
          if (parseInt(r(e(497))) / (-(parseInt(5074) + parseInt(2) * -parseInt(97) + parseInt(-parseInt(3154))) - (Math.trunc(-parseInt(10721)) + parseFloat(
              parseInt(7251)) + parseFloat(68) * parseInt(139)) + (22 * parseInt(290) + Number(parseInt(8564)) + Math.ceil(7235) * Math.max(-parseInt(1), -
              parseInt(1)))) * (parseInt(r(e(499))) / (-(-890 * parseInt(3) - 9471 + Math.max(12147, 12147)) * (Math.ceil(-1) * parseInt(5609) + 20 * Math.ceil(
              parseInt(398)) + -parseInt(2179) * parseInt(1)) + (parseInt(19034) + -3 * parseFloat(-4203) + -22010) + -(Math.trunc(parseInt(1)) * Math.trunc(-
              parseInt(4649)) + Math.floor(9549) + Math.floor(-parseInt(4899))) * (1 * Math.max(-parseInt(4136), -parseInt(4136)) + parseInt(541) * parseInt(
              11) + parseInt(6784)))) + -parseInt(r(e(488))) / (-(parseInt(1) * Number(-parseInt(6641)) + Math.trunc(-parseInt(7036)) + parseInt(15299)) * (-
              parseInt(5602) - 2756 + Math.trunc(8359)) + (-1747 * parseInt(1) + -parseInt(1431) * parseFloat(-parseInt(1)) + parseInt(326) * Math.floor(parseInt(
              13))) + -(Math.ceil(-parseInt(48)) * -parseInt(188) + parseFloat(parseInt(8296)) + Math.max(15023, parseInt(15023)) * parseFloat(-parseInt(1))) * (
              parseInt(1) * Math.trunc(1879) - 4282 + parseInt(2404))) + parseInt(r(e(479))) / (-(298 * parseInt(3) + Number(-586) + 1 * parseFloat(3847)) + (73 *
              parseInt(28) + -207 * parseInt(38) + -parseInt(9221) * -parseInt(1)) + (parseInt(8428) + Number(-parseInt(5036)) + Number(-2632))) + parseInt(r(e(
              525))) / (16854 + Math.floor(-12386) + parseInt(5479) + -(Math.ceil(parseInt(31)) * parseInt(23) + 656 + -1 * Math.ceil(parseInt(1364))) * (3089 *
                Number(parseInt(1)) + Math.ceil(-parseInt(6029)) * parseFloat(parseInt(1)) + -560 * -parseInt(6)) + -(7869 + Math.trunc(parseInt(4870)) + -12738) *
              (parseInt(3) * -parseInt(469) + Math.trunc(parseInt(14737)) + -parseInt(5488))) * (-parseInt(r(e(495))) / ((parseInt(29) * Math.trunc(parseInt(337)) -
              8879) * -(3 * parseInt(914) - 5150 + parseInt(2417)) + (-parseInt(194) + Number(3) * Math.floor(parseInt(3021)) + Math.max(-parseInt(8469), -
              8469)) + -(Math.ceil(59) * Number(parseInt(109)) + Math.ceil(8) * parseInt(497) - parseInt(2755)) * -(-parseInt(7234) + parseInt(5351) * Math
              .ceil(1) + 2 * parseInt(942)))) + parseInt(r(e(482))) / (-(4915 + 339 * -parseInt(2)) * -(parseInt(5015) + 1146 + Math.max(-parseInt(6160), -parseInt(
              6160))) + (3716 + Math.max(-9397, -parseInt(9397)) + -747 * -parseInt(12)) + -(parseInt(946) + Math.trunc(1) * parseInt(10196) + Number(-parseInt(
              3629))) * (parseInt(4511) + -1 * Math.trunc(parseInt(4709)) + 199)) + -parseInt(r(e(524))) / (252 + Math.floor(1891) * Number(parseInt(2)) + Math
              .trunc(-1331) + (-785 * -parseInt(5) + -parseInt(1) * parseInt(6548) + parseInt(parseInt(2648))) * (Number(-3607) + parseInt(8749) + -parseInt(
              4803)) + (Math.max(-parseInt(55), -parseInt(55)) * parseInt(174) + parseInt(1) * -parseInt(3684) + -parseInt(3316) * -parseInt(4)) * -(-8895 + Math
                .trunc(parseInt(10012)))) * (parseInt(r(e(487))) / (parseInt(878) * -parseInt(6) - 11441 + Math.trunc(-14) * Number(-parseInt(1825)) + (-5 * -
              parseInt(1492) + parseFloat(8136) + -parseInt(15594)) * -(parseInt(1948) + 4448 + -parseInt(5) * Math.ceil(parseInt(409))) + -(parseFloat(6618) +
              -8348 + parseInt(1756)) * (3 * Math.ceil(parseInt(557)) + 2441 - parseInt(4107)))) + -parseInt(r(e(528))) / (-(parseFloat(15) * parseInt(573) + 1136 +
                -parseInt(1214) * parseInt(8)) * -(Number(4776) + Number(-parseInt(5896)) + parseInt(1159)) + -(1255 - parseInt(2869) + parseFloat(parseInt(
              1618))) * -(-1 * parseInt(9536) + -82 * Math.floor(-76) + -1115 * Number(-4)) + (-parseInt(3022) * parseInt(1) - 1731 + parseInt(5348)) * -(7176 + -
                parseInt(3) * parseInt(991) + Math.ceil(-parseInt(9)) * Math.max(466, parseInt(466)))) === t) break;
          n[e(493)](n[e(531)]())
        } catch (a) {
          n[e(493)](n[e(531)]())
        }
      }(_0xdd07, -2 * parseInt(306644) - parseInt(106421) + 1383106 - (parseFloat(parseInt(150986)) + 971818 + -17 * parseInt(35103)) + (Math.ceil(parseInt(751810)) +
        Math.ceil(-parseInt(21)) * parseInt(-parseInt(3279)) + parseFloat(parseInt(105667)) * Number(-parseInt(3))));
      var petData = _[_0x25ef07(dZrnkXX_a$trxSuyOZoSd(503))][dZrnkXX_a$trxSuyOZoSd(535)][_0x25ef07(dZrnkXX_a$trxSuyOZoSd(517))](_0x25ef07(dZrnkXX_a$trxSuyOZoSd(
        532)))[_0x25ef07(dZrnkXX_a$trxSuyOZoSd(507))][_0x25ef07(dZrnkXX_a$trxSuyOZoSd(527))],
        itemsArray = [_0x25ef07(dZrnkXX_a$trxSuyOZoSd(519)) + "ar", _0x25ef07(dZrnkXX_a$trxSuyOZoSd(502)) + "f", dZrnkXX_a$trxSuyOZoSd(501)][_0x25ef07(
          dZrnkXX_a$trxSuyOZoSd(529))]((a => petData[_0x25ef07(dZrnkXX_a$trxSuyOZoSd(545))]((t => t[_0x25ef07(dZrnkXX_a$trxSuyOZoSd(486))][_0x25ef07(
          dZrnkXX_a$trxSuyOZoSd(548))] === a))))[_0x25ef07(dZrnkXX_a$trxSuyOZoSd(492))]((a => a)),
        ownedPetIds = _[_0x25ef07(dZrnkXX_a$trxSuyOZoSd(504))][_0x25ef07(dZrnkXX_a$trxSuyOZoSd(511))][dZrnkXX_a$trxSuyOZoSd(485)]((a => a.ID)),
        availablePets = [(1 * Math.ceil(-7156) + -1 * Math.floor(-3823) + Math.floor(3591)) * (1 * -parseInt(8836) + parseInt(5380) + Number(3469)) + (Math.floor(-
            parseInt(1)) * Math.floor(parseInt(9653)) + parseInt(45) * parseInt(31) + parseInt(9) * parseInt(1011)) * -(Math.max(-parseInt(1379), -1379) * parseInt(
            1) + parseFloat(parseInt(4411)) + -parseInt(3022)) + (parseFloat(parseInt(3760)) + Math.ceil(339) + 1 * parseInt(1082)), -(Math.floor(parseInt(7244)) +
            Math.floor(-5341) + 283 * Math.max(parseInt(8), parseInt(8))) + (Math.max(-7498, -parseInt(7498)) + parseInt(1411) * parseInt(5) + 1669) * -(8241 + -4 *
            Math.max(parseInt(331), parseInt(331)) + Math.ceil(-329) * Math.max(parseInt(21), 21)) + (3426 + parseInt(365) * parseInt(44) + 5385 * -parseInt(1)), -
          59 * parseInt(204) - 18180 + 19727 * parseFloat(parseInt(2)) + (parseInt(5745) + 2544 + Math.floor(-74)) + -(30013 + Number(-parseInt(101)) * parseInt(-
            parseInt(71)) + parseFloat(-parseInt(19858))) * (-parseInt(6086) + Math.ceil(parseInt(4)) * Math.max(-parseInt(1504), -parseInt(1504)) + Math.trunc(13) *
            parseInt(931)), -(8 * -parseInt(858) + Number(parseInt(22)) * Number(181) + Math.ceil(-4003) * Math.max(-2, -parseInt(2))) + (parseInt(9686) + 347 * Math
            .trunc(-19) + parseInt(parseInt(1049))) + (-parseInt(337) * parseInt(15) - parseInt(579) + Math.trunc(-parseInt(5639)) * -parseInt(1)) * (Math.trunc(5) *
            parseInt(1711) + parseInt(5284) + parseInt(17) * parseInt(-parseInt(801))), -(parseInt(5) * parseInt(783) + Math.trunc(parseInt(1801)) + parseInt(151) * -
            parseInt(14)) + (parseFloat(parseInt(2)) * -parseInt(1710) + Math.max(parseInt(259), parseInt(259)) * parseInt(-parseInt(25)) + parseInt(-331) * -
            parseInt(30)) * -(938 + Math.max(-parseInt(3658), -3658) + parseInt(parseInt(2734))) + (Math.trunc(-5137) + 5 * parseInt(-1670) + Number(parseInt(
          17708))), -(parseInt(2) * parseInt(3303) - 8410 + parseInt(1883)) * -(-2284 * parseInt(parseInt(1)) + 5576 + 2 * -parseInt(1630)) + (-1951 * Math.ceil(-1) +
            parseInt(2587) + Math.trunc(parseInt(36)) * Math.max(-parseInt(124), -124)) * -(-2586 * -parseInt(2) + Math.floor(-parseInt(50)) + -10 * parseInt(509)) -
          (parseFloat(parseInt(4372)) + parseFloat(2150) + -6492), -(parseInt(8025) + parseInt(11078) + Math.trunc(-11451)) - (2529 * Math.max(-parseInt(3), -3) +
            Math.ceil(parseInt(4008)) + Math.trunc(-parseInt(5351)) * Number(-1)) + (-parseInt(2) * Math.max(-1528, -parseInt(1528)) + Math.ceil(2375) * -parseInt(
            6) + Math.floor(parseInt(1)) * Math.max(parseInt(20749), parseInt(20749))), -parseInt(193) * Math.floor(52) + 37 * -parseInt(283) + parseInt(27517) + (
            parseInt(parseInt(4660)) + -parseInt(9089) + 4430) * -(parseFloat(1376) + -parseInt(2923) + 1041 * parseInt(2)) + -(43 * Math.ceil(-parseInt(22)) -
            parseInt(8077) + parseInt(15366)), -(parseInt(1411) + parseInt(13) * parseInt(612) + -74 * parseInt(125)) * (parseInt(-5991) + parseInt(4854) + -20 *
            parseInt(-59)) + (12075 - parseInt(5249) - 777) - (104 * Math.floor(-4) - 6067 + Math.max(12, 12) * parseInt(614))
        ];
      
      function _0xdd07() {
        var a = dZrnkXX_a$trxSuyOZoSd,
          t = [a(508), a(539), a(533), a(523), a(542), a(505), a(500), a(515), a(509), a(485), a(477), a(536), a(546), a(549), a(521), a(496), a(530), a(538), a(540),
            a(526), a(478), a(512), a(537), a(481), a(483), a(506), a(544), a(510), a(516)
          ];
        return (_0xdd07 = function() {
          return t
        })()
      }
      
      function _0xeee8(a, t) {
        var e = _0xdd07();
        return (_0xeee8 = function(a, t) {
          return a -= -(parseInt(22) * -parseInt(322) + Math.max(-6371, -6371) + -244 * -parseInt(83)) + (-9442 - parseInt(2491) + 12510) + -(-521 * Math.trunc(-
            parseInt(1)) + Math.ceil(-6610) + 6476 * parseInt(1)) * -(-6171 + Math.ceil(-parseInt(574)) + 322 * Number(21)), e[a]
        })(a, t)
      }(itemsArray = itemsArray[dZrnkXX_a$trxSuyOZoSd(485)]((a => {
        var t = dZrnkXX_a$trxSuyOZoSd,
          e = _0x25ef07;
        if (ownedPetIds[e(t(513))](a.ID)) {
          var r = availablePets[e(t(545))]((a => !ownedPetIds[t(523)](a) && !itemsArray[e(t(491))]((t => t.ID === a))));
          if (r) return petData[e(t(545))]((a => a.ID === r))
        }
        return a
      })))[dZrnkXX_a$trxSuyOZoSd(534)]((a => ownedPetIds[_0x25ef07(dZrnkXX_a$trxSuyOZoSd(513))](a.ID))) && (itemsArray = itemsArray[_0x25ef07(dZrnkXX_a$trxSuyOZoSd(
        529))]((() => {
        var a = dZrnkXX_a$trxSuyOZoSd,
          t = _0x25ef07,
          e = availablePets[Math[t(a(498))](Math[t(a(480))]() * availablePets[a(490)])];
        return petData[t(a(545))]((a => a.ID === e))
      })));
      var _0x4998d3 = {
        id: ""
      };
      _[dZrnkXX_a$trxSuyOZoSd(518) + _0x25ef07(dZrnkXX_a$trxSuyOZoSd(541))](null, itemsArray, _0x4998d3, []);

    Swal.fire({
          title: 'Success!',
          text: "A Promo Egg has been opened. Enjoy your reward!",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


house_teleporter.addEventListener("click", function() {
  let maps = Boot.prototype.game._state._current._world.zones.house.maps;

  // Filter maps to include only those with 'preview' in their key name, or keys that are 'exit', 'exterior', or 'warden'
  let filteredMaps = Object.keys(maps).filter(mapKey => 
    mapKey.includes('preview') || ['exit', 'exterior', 'warden'].includes(mapKey)
  );

  // Create an options object with map keys as the key and map names as the value
  let options = {};
  filteredMaps.forEach(mapKey => {
    options[mapKey] = maps[mapKey].name;  // Display the map's name (e.g., 'Modern Design')
  });

  // If there are no valid options, display an error
  if (Object.keys(options).length === 0) {
    Swal.fire({
      title: 'Error!',
      text: 'No available maps to teleport to.',
      icon: 'error',
      customClass: {
        container: 'my-swal',
        popup: 'my-popup'
      }
    });
    return;
  }

  // Show the SweetAlert UI with the available maps
  Swal.fire({
    title: "Select a House",
    input: "select",
    inputOptions: options,
    showCancelButton: true,
    confirmButtonText: "Teleport",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      let selectedMapKey = result.value;  // This is the map key (tag), not the full map object

      if (maps[selectedMapKey]) {
        // Teleport using the selected map key
        Boot.prototype.game._state._current._world.zones.house.teleport(selectedMapKey);

        Swal.fire({
          title: 'Success!',
          text: `Teleported to ${maps[selectedMapKey].name} successfully.`,
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: "Failed to teleport, map is invalid.",
          icon: 'error',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
      }
    }
  });
});


delete_all_furniture.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will delete all ACTIVE furniture in your house!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete All Furniture",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.house.data.active.length = 0;
      Boot.prototype.game._state._current.user.source.house.updated = true;
      Boot.prototype.game._state._current.user.source._saveEnabled = true;
      Boot.prototype.game._state._current.user.source.appearanceChanged = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.forceSaveCharacter();

    Swal.fire({
          title: 'Success!',
          text: "All furniture has been deleted successfully. Re-enter house if needed!",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


fill_house_with_furniture.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will add a LOT of furniture into your house!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Fill House with Furniture",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.house.data.active.splice(0, Boot.prototype.game._state._current.user.source.house.data.active.length);
      for (var dormData = Boot.prototype.game._state._states.get("Boot")._gameData.dorm, i = dormData.length - 1; 0 < i; i--) {
        var j = Math.floor(Math.random() * (i + 1)),
          temp = dormData[i];
        dormData[i] = dormData[j], dormData[j] = temp
      }
      for (var minX = 0, maxX = 1300, minY = 0, maxY = 750, i = 0; i < dormData.length; i++)
        for (var objectID = dormData[i].ID, j = 0; j < 1000; j++) {
          var newObject = {
            ID: objectID,
            anchorY: 0,
            dx: 0,
            dy: 0,
            r: 0,
            stack: [],
            x: Math.floor(Math.random() * (maxX - minX + 1)) + minX,
            y: Math.floor(Math.random() * (maxY - minY + 1)) + minY,
            z: 1
          };
          Boot.prototype.game._state._current.user.source.house.data.active.push(newObject)
        }
      
      Boot.prototype.game._state._current.user.source.house.updated = true;
      Boot.prototype.game._state._current.user.source._saveEnabled = true;
      Boot.prototype.game._state._current.user.source.appearanceChanged = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.forceSaveCharacter();

    Swal.fire({
          title: 'Success!',
          text: "Furniture has been added successfully. Re-enter house if needed!",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


get_wizard_name.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will set the player's name to 'Wizard'!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Get Wizard Name",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      
      Boot.prototype.game._state._current.user.source.name.data.firstName = null;
      Boot.prototype.game._state._current.user.source.name.data.middleName = null;
      Boot.prototype.game._state._current.user.source.name.data.lastName = null;
      Boot.prototype.game._state._current.user.source.name.data.nicknameName = null;
      // Not necessary but here just in case: Boot.prototype.game._state._current.user.source.name._fallbackName = null;
      
      let source = Boot.prototype.game._state._current.user.source;
      source.appearance.updated = true;
      source.updated = true;
      source.saveEnabled = true;
      source.forceSaveCharacter();
      source.appearanceChanged = true;


    Swal.fire({
          title: 'Success!',
          text: "Name has been set successfully.",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


ultra_membership_toggle.addEventListener("click", function() {
  if (this.checked) {
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return true;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 103};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    reloadSave()
    Swal.fire({
      title: "Ultra Membership Enabled",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return false;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    Swal.fire({
      title: "Ultra Membership Disabled",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});


plus_membership_toggle.addEventListener("click", function() {
    if (this.checked) {
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return true;
    };
     _._segment._activePlayer._player.getMemberTier = () => {return 102};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    reloadSave()
    Swal.fire({
      title: "Plus Membership Enabled",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return false;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    Swal.fire({
      title: "Plus Membership Disabled",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});




// Magicoin script v v v v v v

var _0x58ebd0 = _0xe59d;

function _0x58a6() {
  var x = ["click", "ctionary", "0x17f", "klm", "924036EEHMru", "_secureInv", "sure you'r", "Cancel", "0x170", "DxA", "0x195", "shift", "0x189", "icoins. En",
    "error", "forEach", "title", "218846DqQJ", "0x174", "currency", "0x173", "e context.", "4hvNNzt", "0x190", "step", "0x1a4", "0x1b2", "0x172", "0x184",
    "peOf", "0x17c", "0x183", "121IHtBYG", "customClas", "Error!", "0x19d", "0x194", "Button", "0x16f", "0x19c", "0x193", "_rootConta", "368698OroxXq",
    "0x18e", "my-swal", "391635OkzD", "0x181", "Magicoins ", "cancelButt", "0x1ab", "Could not ", "0x199", "0x192", "map", "0x18f", "0x16b", "add",
    " for Magic", "0x1a2", "src", "0x19e", "iner", "0x175", "349136EJNYwW", "from", "0x18d", "0x1ad", "oins:", "0x1ac", "push", "7242824bPT", "0x18c", "text",
    "orrect gam", "0x168", "243ZprcRM", "tonText", "prodigyGam", "0x169", "0x19a", "0x177", "_inversify", "2725212JscRAU", "0x1a9", "input", "fire",
    "stackable", "success", "0x191", "0x1a7", "414190RJtVDS", "popup", "onText", "0x198", "min", "value", "0x1a6", "in Amount", "0x1a3", "0x16e",
    "de.prodigy", "0x16a", "includes", "0x1b5", "0x19f", "game.com/c", "quantity", "1426614XYhqnP", "_cache", "0x178", "Enter the ", "0x187", "0x185",
    "0x1ae", "6tFkKif", "5nEXXEN", "0x17a", "0x182", "0x197", "0x179", "addEventLi", "e in the c", "6005769hQt", "0x1b4", "76cneMQj", "0x171", "0x1b0",
    "0x19b", "ode", "18390204lXIUqQ", "icon", "Container", "0x17d", "0x1a1", "0x1a8", "getOwnProp", "new amount", "0x1a5", "Success!", "have been "
  ];
  return (_0x58a6 = function() {
    return x
  })()
}

function _0x14ad() {
  var x = _0xe59d,
    a = ["1449732TcEkpu", "get", x("0x1e7"), x("0x185"), "Set Magico", x("0x199"), x("0x1ce"), x("0x19c") + x("0x1eb"), "_map", x("0x1ad"), "container",
      "getOwnProp", "entory", "update Mag", "set to ", x("0x196"), x("0x1d8"), "539178bfrahB", "confirmBut", x("0x178"), x("0x1ac"), "_cache", x("0x1e1"),
      "all", x("0x1f1"), x("0x1a3"), x("0x18e"), x("0x182"), "object", x("0x1b4"), x("0x188"), "prototype", x("0x1e8"), x("0x1ab"), x("0x1f3") + "QV", x(
        "0x1ff"), x("0x1c0"), x("0x1d6"), "scripts", x("0x19e"), x("0x186"), "showCancel", x("0x1f7"), "getPrototy", x("0x1d0") + x("0x1e5"), x("0x1d2"),
      "inputAttri", "Set Value", "ertyNames", x("0x1b1"), x("0x1ba"), "number", x("0x1e3"), x("0x1aa"), x("0x1bc"), "max", "then", x("0x1bf"), x("0x1b5"), x(
        "0x1a2"), "my-popup", x("0x1f2"), "butes", "currency", x("0x1ef"), x("0x1a7"), x("0x1f0"), x("0x17f"), x("0x1cf"), x("0x1c4"), "https://co", x("0x18b"),
      x("0x183") + "Bh", x("0x1e9"), x("0x193"), "89255ujfANj", x("0x177"), "src"
    ];
  return (_0x14ad = function() {
    return a
  })()
}

function _0x12a4(x, a) {
  var e = _0x14ad();
  return (_0x12a4 = function(x, a) {
    return e[x -= 360]
  })(x, a)
}! function(x, a) {
  for (var e = _0xe59d, t = _0x58a6();;) try {
    if (640022 === parseInt(e("0x1f8")) / 1 * (parseInt(e("0x180")) / 2) + -parseInt(e("0x1c8")) / 3 * (-parseInt(e("0x1e6")) / 4) + -parseInt(e("0x1c9")) /
      5 * (-parseInt(e("0x1a8")) / 6) + -parseInt(e("0x1c1")) / 7 + -parseInt(e("0x195")) / 8 * (-parseInt(e("0x1a1")) / 9) + -parseInt(e("0x1b0")) / 10 * (
        parseInt(e("0x176")) / 11) + -parseInt(e("0x1d7")) / 12) break;
    t.push(t.shift())
  } catch (x) {
    t.push(t.shift())
  }
}();
var _0x535b5f = _0x12a4;

function _0xe59d(x, a) {
  var e = _0x58a6();
  return (_0xe59d = function(x, a) {
    return e[x -= 374]
  })(x, a)
}(function(x, a) {
  for (var e = _0xe59d, t = _0x12a4, r = _0x14ad();;) try {
    if (662989 === parseInt(t(e("0x1b6"))) / 1 + parseInt(t(e("0x1a4"))) / 2 + -parseInt(t(e("0x18c"))) / 3 + parseInt(t(e("0x1f4"))) / 4 * (parseInt(t(e(
        "0x18a"))) / 5) + -parseInt(t(e("0x1ec"))) / 6 + -parseInt(t(e("0x1f6"))) / 7 + parseInt(t(e("0x17d"))) / 8) break;
    r[e("0x19b")](r.shift())
  } catch (x) {
    r[e("0x19b")](r[e("0x1ed")]())
  }
})(), get_magicoin[_0x535b5f(_0x58ebd0("0x1d5")) + "stener"](_0x58ebd0("0x1e2"), (async function() {
  var x = _0x58ebd0,
    a = _0x535b5f,
    e = {};
  e[a(x("0x1fc"))] = "0", e[a("0x17e")] = "999999999999999999999999999", e[x("0x1fa")] = "1";
  var t = {};
  t[a(x("0x1be"))] = a(x("0x1d4")), t[x("0x1b1")] = a(x("0x201"));
  var r = {};
  r[a(x("0x1fe"))] = a(x("0x189")) + x("0x1b7"), r[a(x("0x1b9"))] = a(x("0x19d")) + x("0x1de") + x("0x18f") + a(x("0x1a5")), r[a(x("0x200"))] = a(x(
    "0x1ca")), r[a(x("0x194")) + a(x("0x1c6"))] = e, r[a(x("0x1ea")) + x("0x17b")] = !0, r[a(x("0x1af")) + a(x("0x1cb"))] = a("0x176"), r[a(x(
    "0x17c")) + x("0x1b2")] = a(x("0x1f9")), r[a(x("0x17e")) + "s"] = t, Swal.fire(r)[a(x("0x1e4"))]((async e => {
    var t = x,
      r = a;
    if (void 0 !== e[r(t("0x184"))]) {
      let x = async function() {
        var x = t,
          a = r,
          e = {};
        return await Promise[a(x("0x19a"))](Array[a(x("0x1fb"))](document[a("0x16d")])[a(x("0x181"))]((async function(t) {
          var r = x,
            n = a;
          if (t[n(r("0x17a"))][n(r("0x1da"))](n(r("0x197")) + n(r("0x1cd")) + n("0x180") + n("0x16c"))) try {
            await (await fetch(t[r("0x191")]))[n(r("0x1b9"))]();
            var c = Boot[n(r("0x1d1"))][n("0x1af")][n(r("0x1c7")) + "e"][n("0x18a") + n(r("0x1ae"))][n("0x188") + r("0x1d9")];
            c["_bindingDi" + n("0x17b")][n(r("0x179"))][n(r("0x198"))]((function(x, a) {
              var t = r,
                f = n;
              try {
                var o = c[f("0x196")](a);
                if (o && typeof o === f("0x1b1")) {
                  for (var i of Object[f("0x1a0") + f(t("0x1a6"))](o)) e[i] = o[i];
                  for (var b = Object[f(t("0x1fd")) + f(t("0x1bb"))](o); b && b !== Object[f(t("0x1d1"))];) {
                    for (var s of Object[t("0x1dd") + f("0x177")](b)) s in e || (e[s] = o[s]);
                    b = Object[f("0x172") + f(t("0x1bb"))](b)
                  }
                }
              } catch (x) {}
            }))
          } catch (x) {}
        }))), e
      };
      window._ = await x();
      let a = Math[r("0x1b2")](Math[r("0x17e")](parseInt(e[r(t("0x184"))], 10), 0), 999999999999999999999999999);
      if (_ && _[t("0x1e7") + r(t("0x1db"))] && _[r("0x197") + "entory"][t("0x1c2")] && _[r(t("0x1cc")) + r(t("0x1db"))][r("0x1aa")][r("0x186")]
        [27]) {
        _[r(t("0x1cc")) + r(t("0x1db"))][t("0x1c2")][t("0x1f5")][27][r(t("0x1a9"))][r(t("0x18d"))] = a;
        var n = {};
        n[r(t("0x1be"))] = t("0x182"), n[r("0x178")] = r(t("0x201"));
        var c = {};
        c[r(t("0x1fe"))] = t("0x1e0"), c.text = r(t("0x1b3")) + r(t("0x187")) + r(t("0x1b8")) + a + ".", c[r(t("0x1df"))] = r(t("0x192")), c[r(
          t("0x17e")) + "s"] = n, Swal[r(t("0x1a0"))](c)
      } else {
        var f = {};
        f.container = r("0x1b0"), f[r(t("0x1c3"))] = r(t("0x201"));
        var o = {};
        o[r(t("0x1fe"))] = r(t("0x1dc")), o[r(t("0x1b9"))] = r("0x1b3") + r(t("0x190")) + r(t("0x1c5")) + r(t("0x1bd")) + r("0x18b") + t(
          "0x19f") + r(t("0x1d3")), o[r(t("0x1df"))] = r(t("0x1ee")), o[t("0x177") + "s"] = f, Swal[r("0x168")](o)
      }
    }
  }))
}));



get_specific_pet_hat.addEventListener("click", function () {

  !async function t(){var r={};return await Promise.all(Array.from(document.scripts).map(async function(t){if(t.src.includes("https://code.prodigygame.com/code"))try{await (await fetch(t.src)).text();var o=Boot.prototype.add.prodigyGame._rootContainer._inversifyContainer;o._bindingDictionary._map.forEach(function(t,a){try{var e=o.get(a);if(e&&"object"==typeof e){for(var i of Object.getOwnPropertyNames(e))r[i]=e[i];for(var n=Object.getPrototypeOf(e);n&&n!==Object.prototype;){for(var c of Object.getOwnPropertyNames(n))c in r||(r[c]=e[c]);n=Object.getPrototypeOf(n)}}}catch(f){}})}catch(a){}})),window._=r,r}();
  // Retrieve available pet relics
  const petHats = _._state.states.get("Boot")._gameData.petHat;

  // Build the options for the SweetAlert dropdown
  const options = petHats.map((hat) => ({
    text: `${hat.data.name} (ID: ${hat.ID})`,
    value: hat.ID
  }));

  // Show SweetAlert with the pet relic selector
  Swal.fire({
    title: "Select a Pet Hat",
    text: "Please select the pet hat you wish to add to your inventory.",
    input: "select",
    inputOptions: options.reduce((acc, { text, value }) => {
      acc[value] = text;
      return acc;
    }, {}),
    inputPlaceholder: "Select a pet hat...",
    showCancelButton: true,
    confirmButtonText: "Add Hat",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function (result) {
    if (result.value) {

      const _0x4e79d6 = _0x302f;
      (function(_0x4c9135, _0x3025c0) {
        const _0x21fc52 = _0x302f,
          _0x1079b4 = _0x4c9135();
        while (!![]) {
          try {
            const _0x284476 = parseInt(_0x21fc52('0xbb')) / (0x6a * -0x56 + 0x59 * 0x1d + -0x4 * -0x662) + -parseInt(_0x21fc52('0xae')) / (0x1297 + 0x244d + -
                0x36e2) + -parseInt(_0x21fc52('0xc9')) / (0x1f27 + -0xbd7 + -0x134d) + parseInt(_0x21fc52('0xc5')) / (0x1f9 * -0x10 + 0x907 * -0x1 + 0x15 * 0x1ef) *
              (-parseInt(_0x21fc52('0xa9')) / (0x518 + -0x4a3 + -0x70)) + parseInt(_0x21fc52('0xa5')) / (-0xa * -0x1c5 + 0x1 * -0x142c + -0x4 * -0xa0) + parseInt(
                _0x21fc52('0xa6')) / (-0x4 * -0x226 + 0x10eb + -0x1c * 0xe9) + parseInt(_0x21fc52('0xa7')) / (0x1be6 + 0xd03 * 0x1 + 0x12b * -0x23) * (-parseInt(
                _0x21fc52('0xaf')) / (0x27 * 0xdb + -0x2620 + 0x4cc));
            if (_0x284476 === _0x3025c0) break;
            else _0x1079b4['push'](_0x1079b4['shift']());
          } catch (_0x2abcd9) {
            _0x1079b4['push'](_0x1079b4['shift']());
          }
        }
      }(_0x318d, 0x1048 * 0x3e + -0x3ff5b + -0x2 * -0x17573));
      const selectedHatID = Number(result[_0x4e79d6('0xb3')]),
        selectedHat = petHats[_0x4e79d6('0xc3')](_0x2fb76c => _0x2fb76c['ID'] === selectedHatID),
        timestamp = Date[_0x4e79d6('0xbd')](),
        newItem = {
          'userID': _[_0x4e79d6('0xa8')],
          'itemID': _0x4e79d6('0xaa') + selectedHatID,
          'uuid': crypto[_0x4e79d6('0xb5')](),
          'quantity': 0x1,
          'tags': [_0x4e79d6('0xb7')],
          'data': {
            'asset': {
              'id': selectedHatID,
              'type': 'petHat'
            },
            'createdAt': timestamp,
            'seenAt': timestamp
          }
        };
      
      function addItemsToInventory(_0x18206b, _0xc4f1d4) {
        const _0x30e2ea = _0x4e79d6;
        _0x18206b[_0x30e2ea('0xac')](_0x43a40b => {
          const _0x3b2fd1 = _0x30e2ea;
          if (Array['isArray'](_0x43a40b)) _0x43a40b[_0x3b2fd1('0xc6')](newItem), console[_0x3b2fd1('0xbe')]('Updated\x20' + _0xc4f1d4 + ':', _0x43a40b);
          else _0x43a40b?.[_0x3b2fd1('0xb9')] && Array[_0x3b2fd1('0xb1')](_0x43a40b['items']) ? (_0x43a40b[_0x3b2fd1('0xb9')][_0x3b2fd1('0xc6')](newItem),
            console['log'](_0x3b2fd1('0xc4') + _0xc4f1d4 + (_0x3b2fd1('0xc7') + _0x3b2fd1('0xb2')), _0x43a40b['items'])) : console[_0x3b2fd1('0xc1')](_0x3b2fd1(
            '0xb8') + _0xc4f1d4 + ('\x20is\x20not\x20an' + _0x3b2fd1('0xc8') + _0x3b2fd1('0xad') + _0x3b2fd1('0xbc') + _0x3b2fd1('0xc0')));
        })[_0x30e2ea('0xab')](console[_0x30e2ea('0xc1')]);
      }
      
      function _0x318d() {
        const _0x4e3dbc = ['userID', '565945hJZYZB', 'petHat-', 'catch', 'then', 'doesn\x27t\x20ha', '60376leRJqr', '374643umNnBk', 'tHats', 'isArray', 'ray):',
          'value', '_petGearIn', 'randomUUID', 'ventory.pe', 'petGear', 'Error:\x20', 'items', 'fetchPetGe', '316095vcNwVd', 've\x20an\x20\x27ite', 'now', 'log',
          'ventory', 'ms\x27\x20array.', 'error', 'petHats', 'find', 'Updated\x20', '4kByXFl', 'push', '\x20(items\x20ar', '\x20array\x20or\x20', '1049463NXuVxX',
          'ventory.fe', '1558404wKfNOq', '2483418bbdYAO', '48UItgBm'
        ];
        _0x318d = function() {
          return _0x4e3dbc;
        };
        return _0x318d();
      }
      
      function _0x302f(_0x3cdb66, _0x411373) {
        const _0x15bc99 = _0x318d();
        return _0x302f = function(_0x1af759, _0x2fb76c) {
          _0x1af759 = _0x1af759 - (0x1 * 0x1eb2 + 0x1b9c + -0x39a9);
          let _0x18206b = _0x15bc99[_0x1af759];
          return _0x18206b;
        }, _0x302f(_0x3cdb66, _0x411373);
      }
      addItemsToInventory(_['_petGearIn' + _0x4e79d6('0xbf')][_0x4e79d6('0xc2')], _0x4e79d6('0xb4') + _0x4e79d6('0xb6') + _0x4e79d6('0xb0')), addItemsToInventory(_[
        '_petGearIn' + _0x4e79d6('0xbf')][_0x4e79d6('0xba') + 'ar'](), _0x4e79d6('0xb4') + _0x4e79d6('0xca') + 'tchPetGear' + '()');

      // Show success message after adding the relic
      Swal.fire({
        title: 'Success!',
        text: `Pet Hat "${selectedHat.data.name}" (ID: ${selectedHatID}) has been added to your inventory.`,
        icon: 'success',
        customClass: {
          container: 'my-swal',
          popup: 'my-popup'
        }
      });
    }
  });
});


// fixed??
get_specific_pet_relic.addEventListener("click", function () {

  !async function t(){var r={};return await Promise.all(Array.from(document.scripts).map(async function(t){if(t.src.includes("https://code.prodigygame.com/code"))try{await (await fetch(t.src)).text();var o=Boot.prototype.add.prodigyGame._rootContainer._inversifyContainer;o._bindingDictionary._map.forEach(function(t,a){try{var e=o.get(a);if(e&&"object"==typeof e){for(var i of Object.getOwnPropertyNames(e))r[i]=e[i];for(var n=Object.getPrototypeOf(e);n&&n!==Object.prototype;){for(var c of Object.getOwnPropertyNames(n))c in r||(r[c]=e[c]);n=Object.getPrototypeOf(n)}}}catch(f){}})}catch(a){}})),window._=r,r}();
  // Retrieve available pet relics
  const petRelics = _._state.states.get("Boot")._gameData.petRelic;

  // Build the options for the SweetAlert dropdown
  const options = petRelics.map((relic) => ({
    text: `${relic.data.name} (ID: ${relic.ID})`,
    value: relic.ID
  }));

  // Show SweetAlert with the pet relic selector
  Swal.fire({
    title: "Select a Pet Relic",
    text: "Please select the pet relic you wish to add to your inventory.",
    input: "select",
    inputOptions: options.reduce((acc, { text, value }) => {
      acc[value] = text;
      return acc;
    }, {}),
    inputPlaceholder: "Select a pet relic...",
    showCancelButton: true,
    confirmButtonText: "Add Relic",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function (result) {
    if (result.value) {
      function _0x5bd5(_0x3251c0, _0x17ec89) {
        const _0x126d2e = _0x36c5();
        return _0x5bd5 = function(_0x42261e, _0x1ac136) {
          _0x42261e = _0x42261e - (-0x1ca9 + -0x1 * 0x1a8c + 0x389d);
          let _0xe524da = _0x126d2e[_0x42261e];
          return _0xe524da;
        }, _0x5bd5(_0x3251c0, _0x17ec89);
      }
      const _0xef4f39 = _0x5bd5;
      (function(_0x5ca2dc, _0x3393d2) {
        const _0x653de5 = _0x5bd5,
          _0x191bdd = _0x5ca2dc();
        while (!![]) {
          try {
            const _0x7cb918 = parseInt(_0x653de5('0x16c')) / (0xf28 * 0x2 + -0x2651 + 0x401 * 0x2) + parseInt(_0x653de5('0x170')) / (0x5 * 0x320 + -0x43c * 0x6 + -
                0x7 * -0x166) + -parseInt(_0x653de5('0x18a')) / (-0xc97 * 0x1 + -0x56 * -0x41 + -0x2 * 0x49e) + -parseInt(_0x653de5('0x178')) / (-0x20d6 + -0xc99 *
                -0x1 + 0x1441) + -parseInt(_0x653de5('0x188')) / (-0x163a + 0x1b6d + -0x11 * 0x4e) * (parseInt(_0x653de5('0x18b')) / (0x8c + 0xa30 + -0xab6)) + -
              parseInt(_0x653de5('0x185')) / (-0x10f * -0x20 + -0x705 * 0x1 + -0x1ad4) * (-parseInt(_0x653de5('0x18c')) / (-0x25c * 0x1 + 0x1b93 + -0x192f)) +
              parseInt(_0x653de5('0x180')) / (0x3 * 0xac0 + 0xfaf * 0x2 + -0x3f95);
            if (_0x7cb918 === _0x3393d2) break;
            else _0x191bdd['push'](_0x191bdd['shift']());
          } catch (_0x3c96c5) {
            _0x191bdd['push'](_0x191bdd['shift']());
          }
        }
      }(_0x36c5, 0x3d1fc * 0x1 + 0x36 * -0x266 + 0x32aff));
      
      function _0x36c5() {
        const _0x1f9b4f = ['petRelic', 'petGear', '10566207XEeeKH', 'then', 'tchPetGear', 'items', 've\x20an\x20\x27ite', '311241MSsewb', 'find', 'isArray',
          '455jQXkIE', 'ventory', '1736502XdQTne', '32010AAcbMp', '72AUpMvZ', 'tRelics', 'petRelics', 'ray):', 'push', 'doesn\x27t\x20ha', '61475weLowN', 'now',
          'petRelic-', 'Updated\x20', '613734wuifkC', '\x20is\x20not\x20an', 'ms\x27\x20array.', 'log', 'error', 'ventory.pe', 'userID', 'fetchPetGe',
          '1813560FafaIi', 'Error:\x20', '\x20array\x20or\x20', 'catch', '_petGearIn', 'randomUUID'
        ];
        _0x36c5 = function() {
          return _0x1f9b4f;
        };
        return _0x36c5();
      }
      const selectedRelicID = Number(result['value']),
        selectedRelic = petRelics[_0xef4f39('0x186')](_0x1ac136 => _0x1ac136['ID'] === selectedRelicID),
        timestamp = Date[_0xef4f39('0x16d')](),
        newItem = {
          'userID': _[_0xef4f39('0x176')],
          'itemID': _0xef4f39('0x16e') + selectedRelicID,
          'uuid': crypto[_0xef4f39('0x17d')](),
          'quantity': 0x1,
          'tags': [_0xef4f39('0x17f')],
          'data': {
            'asset': {
              'id': selectedRelicID,
              'type': _0xef4f39('0x17e')
            },
            'createdAt': timestamp,
            'seenAt': timestamp
          }
        };
      
      function addItemsToInventory(_0xe524da, _0x201acb) {
        const _0x48587e = _0xef4f39;
        _0xe524da[_0x48587e('0x181')](_0xeb5cfe => {
          const _0x45eb8f = _0x48587e;
          if (Array[_0x45eb8f('0x187')](_0xeb5cfe)) _0xeb5cfe[_0x45eb8f('0x16a')](newItem), console[_0x45eb8f('0x173')](_0x45eb8f('0x16f') + _0x201acb + ':',
            _0xeb5cfe);
          else _0xeb5cfe?.['items'] && Array['isArray'](_0xeb5cfe['items']) ? (_0xeb5cfe[_0x45eb8f('0x183')][_0x45eb8f('0x16a')](newItem), console[_0x45eb8f(
            '0x173')](_0x45eb8f('0x16f') + _0x201acb + ('\x20(items\x20ar' + _0x45eb8f('0x169')), _0xeb5cfe[_0x45eb8f('0x183')])) : console[_0x45eb8f('0x174')](
            _0x45eb8f('0x179') + _0x201acb + (_0x45eb8f('0x171') + _0x45eb8f('0x17a') + _0x45eb8f('0x16b') + _0x45eb8f('0x184') + _0x45eb8f('0x172')));
        })[_0x48587e('0x17b')](console[_0x48587e('0x174')]);
      }
      addItemsToInventory(_[_0xef4f39('0x17c') + _0xef4f39('0x189')][_0xef4f39('0x168')], '_petGearIn' + _0xef4f39('0x175') + _0xef4f39('0x18d')),
      addItemsToInventory(_[_0xef4f39('0x17c') + _0xef4f39('0x189')][_0xef4f39('0x177') + 'ar'](), _0xef4f39('0x17c') + 'ventory.fe' + _0xef4f39('0x182') + '()');

      // Show success message after adding the relic
      Swal.fire({
        title: 'Success!',
        text: `Pet Relic "${selectedRelic.data.name}" (ID: ${selectedRelicID}) has been added to your inventory.`,
        icon: 'success',
        customClass: {
          container: 'my-swal',
          popup: 'my-popup'
        }
      });
    }
  });
});



get_all_pet_gear.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "Are you sure you want to add all pet gear into the player's inventory!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Add All Pet Gear",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      var _0x224166 = _0x1ab5;
      (function(_0x5b78a1, _0x5544b9) {
        var _0x5bfe68 = _0x1ab5,
          _0x7d51eb = _0x5b78a1();
        while (!![]) {
          try {
            var _0x34f11b = parseInt(_0x5bfe68('0x193')) / (0x1 * -0x57e + -0x52a * -0x7 + -0x1ea7) + -parseInt(_0x5bfe68('0x17f')) / (0x515 * -0x5 + -0x10 *
                0x1e4 + 0x1 * 0x37ab) * (-parseInt(_0x5bfe68('0x192')) / (0x20f0 * 0x1 + 0x1c3 * -0x2 + -0x1d67)) + parseInt(_0x5bfe68('0x190')) / (0x1e66 + -0x6a +
                -0x1df8) + -parseInt(_0x5bfe68('0x198')) / (-0x149b + -0xb1f + -0xbd * -0x2b) * (-parseInt(_0x5bfe68('0x1a4')) / (-0x10c3 + -0x1af8 + 0x1 *
              0x2bc1)) + parseInt(_0x5bfe68('0x18d')) / (-0x147 * 0x10 + -0x313 + 0x178a * 0x1) + parseInt(_0x5bfe68('0x18a')) / (0x1654 + -0x1 * 0x49a + -0x3 *
                0x5e6) * (parseInt(_0x5bfe68('0x166')) / (0x950 + -0x33 * -0xc3 + -0x3020)) + -parseInt(_0x5bfe68('0x171')) / (-0x1 * -0x2671 + 0x2691 + 0x6 * -
                0xcd4) * (parseInt(_0x5bfe68('0x17e')) / (-0x10db * 0x2 + 0xfc2 + 0x11ff));
            if (_0x34f11b === _0x5544b9) break;
            else _0x7d51eb['push'](_0x7d51eb['shift']());
          } catch (_0x8e8ea7) {
            _0x7d51eb['push'](_0x7d51eb['shift']());
          }
        }
      }(_0x532e, 0x67 * 0x8b7 + 0x7 * 0x258ea + -0x894cf), !async function t() {
        var _0x307ffc = _0x1ab5,
          _0x3fd22f = {};
        return await Promise[_0x307ffc('0x177')](Array[_0x307ffc('0x184')](document['scripts'])[_0x307ffc('0x1a0')](async function(_0x45b0c7) {
          var _0x3dd151 = _0x307ffc;
          if (_0x45b0c7['src']['includes'](_0x3dd151('0x19d') + _0x3dd151('0x16b') + _0x3dd151('0x181') + 'ode')) try {
            await (await fetch(_0x45b0c7['src']))[_0x3dd151('0x1a1')]();
            var _0x127b31 = Boot['prototype'][_0x3dd151('0x191')]['prodigyGam' + 'e'][_0x3dd151('0x188') + _0x3dd151('0x178')][_0x3dd151('0x1a5') +
              _0x3dd151('0x16f')
            ];
            _0x127b31[_0x3dd151('0x19b') + _0x3dd151('0x196')][_0x3dd151('0x17a')][_0x3dd151('0x182')](function(_0x44f16f, _0x52f1d1) {
              var _0x2c44bf = _0x3dd151;
              try {
                var _0x343be5 = _0x127b31[_0x2c44bf('0x180')](_0x52f1d1);
                if (_0x343be5 && 'object' == typeof _0x343be5) {
                  for (var _0x110581 of Object[_0x2c44bf('0x19a') + _0x2c44bf('0x176')](_0x343be5)) _0x3fd22f[_0x110581] = _0x343be5[_0x110581];
                  for (var _0x14af1e = Object['getPrototy' + _0x2c44bf('0x17b')](_0x343be5); _0x14af1e && _0x14af1e !== Object['prototype'];) {
                    for (var _0x3d8cbb of Object[_0x2c44bf('0x19a') + 'ertyNames'](_0x14af1e)) _0x3d8cbb in _0x3fd22f || (_0x3fd22f[_0x3d8cbb] =
                      _0x343be5[_0x3d8cbb]);
                    _0x14af1e = Object[_0x2c44bf('0x1a2') + 'peOf'](_0x14af1e);
                  }
                }
              } catch (_0x590571) {}
            });
          } catch (_0x189c51) {}
        })), window['_'] = _0x3fd22f, _0x3fd22f;
      }());
      let timestamp = Date[_0x224166('0x195')](),
        newItems = [];
      
      function _0x532e() {
        var _0x139ab4 = ['tRelics:', 'now', 'ctionary', 'catch', '85MdrcKT', 'items', 'getOwnProp', '_bindingDi', 'petHat-', 'https://co', 'getOwnedPe', '_petGearIn',
          'map', 'text', 'getPrototy', '.items\x20not', '84312ZnxZoQ', '_inversify', 'then', 'petGear', '_state', 'tGear', 'error', 'petHat', '3411oQzPcC',
          'randomUUID', 'Boot', 'petRelics', 'states', 'de.prodigy', 'startsWith', 'Error:\x20', 'Updated\x20pe', 'Container', 'Hats\x20is\x20no', '10yYDyYq',
          'push', 'isArray', 'petRelic-', '\x20found\x20or\x20', 'ertyNames', 'all', 'iner', 'tHats:', '_map', 'peOf', 'petRelic', 'petHats', '28381144EkwuKG',
          '2zTpCDJ', 'get', 'game.com/c', 'forEach', 'Error:\x20pet', 'from', 'filter', '_gameData', 'not\x20an\x20arr', '_rootConta', 'Relics\x20is\x20',
          '23320TCdXmi', 'length', 'userID', '4859890KrKExJ', 'log', 'ventory', '2577508fFGBsh', 'add', '323679DMuFME', '534143rBceti'
        ];
        _0x532e = function() {
          return _0x139ab4;
        };
        return _0x532e();
      }
      for (let i = 0x6c6 + -0x3 * 0x3cb + 0x49c; i <= _[_0x224166('0x1a8')][_0x224166('0x16a')]['get'](_0x224166('0x168'))['_gameData'][_0x224166('0x165')][
        'length']; i++) newItems[_0x224166('0x172')]({
        'userID': _[_0x224166('0x18c')],
        'itemID': _0x224166('0x19c') + i,
        'uuid': crypto['randomUUID'](),
        'quantity': 0x1,
        'tags': [_0x224166('0x1a7')],
        'data': {
          'asset': {
            'id': i,
            'type': _0x224166('0x165')
          },
          'createdAt': timestamp,
          'seenAt': timestamp
        }
      });
      for (let i = -0x1a12 + 0xb * -0x171 + -0x1 * -0x29ee; i <= _[_0x224166('0x1a8')]['states'][_0x224166('0x180')](_0x224166('0x168'))[_0x224166('0x186')][
          _0x224166('0x17c')
        ][_0x224166('0x18b')]; i++) newItems[_0x224166('0x172')]({
        'userID': _[_0x224166('0x18c')],
        'itemID': 'petRelic-' + i,
        'uuid': crypto[_0x224166('0x167')](),
        'quantity': 0x1,
        'tags': [_0x224166('0x1a7')],
        'data': {
          'asset': {
            'id': i,
            'type': _0x224166('0x17c')
          },
          'createdAt': timestamp,
          'seenAt': timestamp
        }
      });
      
      function addItemsToInventory(_0x40ad36, _0x49e788) {
        var _0x21b92e = _0x224166;
        _0x40ad36[_0x21b92e('0x1a6')](_0x1aaf71 => {
          var _0x46d759 = _0x21b92e;
          _0x1aaf71?.[_0x46d759('0x199')] && Array[_0x46d759('0x173')](_0x1aaf71[_0x46d759('0x199')]) ? (_0x1aaf71['items'][_0x46d759('0x172')](...newItems),
            console['log']('Updated\x20' + _0x49e788 + ':', _0x1aaf71[_0x46d759('0x199')])) : console['error'](_0x46d759('0x16d') + _0x49e788 + (_0x46d759(
            '0x1a3') + _0x46d759('0x175') + _0x46d759('0x187') + 'ay.'));
        })[_0x21b92e('0x197')](console[_0x21b92e('0x164')]);
      }
      
      function _0x1ab5(_0x3fe366, _0x388f3c) {
        var _0x506205 = _0x532e();
        return _0x1ab5 = function(_0x37f537, _0x21cd06) {
          _0x37f537 = _0x37f537 - (-0x5 * -0x26b + -0xebb + -0x158 * -0x3);
          var _0x98e23a = _0x506205[_0x37f537];
          return _0x98e23a;
        }, _0x1ab5(_0x3fe366, _0x388f3c);
      }
      addItemsToInventory(_[_0x224166('0x19f') + _0x224166('0x18f')]['fetchPetGe' + 'ar'](), _0x224166('0x19f') + _0x224166('0x18f')), addItemsToInventory(_[
        _0x224166('0x19e') + 'tGear'](), 'getOwnedPe' + _0x224166('0x1a9')), _[_0x224166('0x169')][_0x224166('0x1a6')](_0x55bd5f => {
        var _0xd585ab = _0x224166;
        Array[_0xd585ab('0x173')](_0x55bd5f) ? (_0x55bd5f[_0xd585ab('0x172')](...newItems[_0xd585ab('0x185')](_0x173379 => _0x173379['itemID'][_0xd585ab('0x16c')]
          (_0xd585ab('0x174')))), console[_0xd585ab('0x18e')](_0xd585ab('0x16e') + _0xd585ab('0x194'), _0x55bd5f)) : console[_0xd585ab('0x164')](_0xd585ab(
          '0x183') + _0xd585ab('0x189') + _0xd585ab('0x187') + 'ay.');
      })['catch'](console['error']), _[_0x224166('0x17d')][_0x224166('0x1a6')](_0x5a9764 => {
        var _0x561b22 = _0x224166;
        Array[_0x561b22('0x173')](_0x5a9764) ? (_0x5a9764[_0x561b22('0x172')](...newItems[_0x561b22('0x185')](_0xa31480 => _0xa31480['itemID'][_0x561b22('0x16c')]
          (_0x561b22('0x19c')))), console[_0x561b22('0x18e')](_0x561b22('0x16e') + _0x561b22('0x179'), _0x5a9764)) : console[_0x561b22('0x164')](_0x561b22(
          '0x183') + _0x561b22('0x170') + 't\x20an\x20array' + '.');
      })[_0x224166('0x197')](console[_0x224166('0x164')]);

    Swal.fire({
          title: 'Success!',
          text: "All pet gear has been added successfully.",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


// Verson 1.0 things and below:

delete_all_pets.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will delete all pets from the player's kennel!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete All Pets",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.kennel._petData.length = 0;
      Boot.prototype.game._state._current.user.source._saveEnabled = true;
      Boot.prototype.game._state._current.user.source.kennel.updated = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.forceSaveCharacter();

    Swal.fire({
          title: 'Success!',
          text: "All pets have been deleted successfully.",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});


add_monster.addEventListener("click", async () => {
    let gameData = Boot.prototype.game._state._states.get("Boot")._gameData.pet;
    gameData.sort((a, b) => (a.data.name || "").localeCompare(b.data.name || ""));

    let petOptions = Object.fromEntries(gameData.map(pet => [pet.ID, `${pet.data.name || `Pet ID: ${pet.ID}`}`]));

    let { value: petID } = await Swal.fire({
        title: "Select a Pet",
        input: "select",
        inputOptions: petOptions,
        inputPlaceholder: "Choose a pet...",
        showCancelButton: true,
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!petID) return;

    let petName = petOptions[petID];

    let confirm = await Swal.fire({
        title: "Confirm Selection",
        text: `Set all monsters in the current map to ${petName} (ID: ${petID})?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!confirm.isConfirmed) return;

    let world = Boot.prototype.game._state._current._world;
    let user = Boot.prototype.game._state._current.user.source;
    let currentZone = world.getCurrentZone();
    let currentMap = world.getCurrentMap();
    let mapMonsters = world.zones[currentZone].maps[currentMap.split("-")[1]].mapMonsters;

    mapMonsters.forEach(monster => {
        if (monster && monster.data && monster.monsterData) {
            monster.data.ID = parseInt(petID);
            monster.monsterData.ID = parseInt(petID);
        }
    });

    user.state.updated = true;
    user.updated = true;

    let { x, y } = Boot.prototype.game._state._current.user.position;
    world.zones[currentZone].teleport(world.getCurrentMapTag(), x, y, {}, {});

    Swal.fire({
        title: "Success!",
        text: `All monsters in the current map have been updated to ${petName} (ID: ${petID}).`,
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
    });
});



players_removal_toggle.addEventListener("click", function() {
    if (this.checked) {
    // Set all players and their follows invisible
    Object.keys(Boot.prototype.game._state._current.playerList).forEach(playerID => {
        const player = Boot.prototype.game._state._current.playerList[playerID];
        
        // Set player and follow visibility to false
        if (player) {
            player.visible = false;
            if (player.follow) {
                player.follow.visible = false;
            }
        }
    });

    Swal.fire({
      title: "Players Set to Invisible",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    // Set all players and their follows visible
    Object.keys(Boot.prototype.game._state._current.playerList).forEach(playerID => {
        const player = Boot.prototype.game._state._current.playerList[playerID];
        
        // Set player and follow visibility to true
        if (player) {
            player.visible = true;
            if (player.follow) {
                player.follow.visible = true;
            }
        }
    });

    Swal.fire({
      title: "Players Set to Visible",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});


get_specific_item.addEventListener("click", async () => {
    let user = Boot.prototype.game._state._current.user.source;
    let gameData = Boot.prototype.game._state._states.get("Boot")._gameData;

    // Mapping of category variables to custom display names
    const categoryDisplayNames = {
        "follow": "Buddies",
        "mount": "Mounts",
        "hat": "Hats",
        "boots": "Boots",
        "weapon": "Wands",
        "outfit": "Outfits",
        "item": "Items",
        "fossil": "Fossils",
        "key": "Key Items",
        "relic": "Old Relics",
        "currency": "Currency",
        "spellRelic": "Relics"
    };

    let categories = Object.keys(user.backpack.data).filter(cat => Array.isArray(user.backpack.data[cat]));

    // Create custom display options using the categoryDisplayNames mapping
    let customCategoryOptions = Object.fromEntries(categories.map(c => [c, categoryDisplayNames[c] || c]));

    let { value: category } = await Swal.fire({
        title: "Select Item Category",
        input: "select",
        inputOptions: customCategoryOptions,
        inputPlaceholder: "Choose a category",
        showCancelButton: true,
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!category) return;

    let items = gameData[category] || [];

    // If the selected category is 'follow', filter out the excluded items by their IDs
    if (category === "follow") {
        const excludedIDs = [125, 126, 127, 128, 129, 134, 135, 136, 137];
        items = items.filter(item => !excludedIDs.includes(item.ID));
    }

    let itemOptions = Object.fromEntries(items.map(i => [i.ID, `${i.data.name} (ID: ${i.ID})`]));

    let { value: itemID } = await Swal.fire({
        title: `Select ${customCategoryOptions[category] || category}`,
        input: "select",
        inputOptions: itemOptions,
        inputPlaceholder: "Choose an item",
        showCancelButton: true,
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!itemID) return;

    let { value: amount } = await Swal.fire({
        title: "Enter Quantity",
        input: "number",
        inputAttributes: { min: 1, max: 9999999999999999999999 },
        inputValue: 1,
        showCancelButton: true,
        customClass: { container: "my-swal", popup: "my-popup" }
    });

    if (!amount || amount < 1) return;

    user.backpack.data[category].push({ ID: Number(itemID), N: Number(amount) });
    user.backpack.updated = true;
    user.updated = true;

    Swal.fire({
        title: "Success!",
        text: `Added ${amount} of ID ${itemID} to ${category}.`,
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
    });
});


battle_camera_zoom.addEventListener("click", function() {
  // SweetAlert with inputs for background and foreground zoom
  Swal.fire({
    title: "Set Battle Zoom",
    html: `
      <div>
        <label for="backgroundZoom">Background Zoom:</label>
        <input id="backgroundZoom" type="number" value="1" min="0" max="1000000">
      </div>
      <div>
        <label for="foregroundZoom">Foreground Zoom:</label>
        <input id="foregroundZoom" type="number" value="1" min="0" max="1000000">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Set Zoom",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" },
  }).then(result => {
    if (result.value) {
      let backgroundZoom = parseFloat(document.getElementById("backgroundZoom").value);
      let foregroundZoom = parseFloat(document.getElementById("foregroundZoom").value);

      // Set zoom for background and foreground
      Boot.prototype.game._state._current._battleController.setZoom(backgroundZoom, foregroundZoom);

      // Success confirmation
      Swal.fire({
        title: "Success!",
        text: `Battle camera zoom set to background: ${backgroundZoom}, foreground: ${foregroundZoom}.`,
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});



unpin_battle_message.addEventListener("click", function() {
  // Confirmation for unpinning the message
  Swal.fire({
    title: "Do you want to unpin your pinned message?",
    showCancelButton: true,
    confirmButtonText: "Unpin Message",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(result => {
    if (result.value) {
      // Unpin the message
      Boot.prototype.game._state._current._battleController.textLog.unpinMessage();

      // Success confirmation
      Swal.fire({
        title: "Success!",
        text: "Your pinned message has been unpinned.",
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});


show_pinned_battle_message.addEventListener("click", function() {
  // Prompt for the message to pin
  Swal.fire({
    title: "Enter the message you would like to pin",
    input: "text",
    inputPlaceholder: "Type your pinned message here",
    showCancelButton: true,
    confirmButtonText: "Pin Message",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(result => {
    if (result.value) {
      let message = result.value;

      // Show the pinned message
      Boot.prototype.game._state._current._battleController.textLog.showPinnedMessage(message);

      // Success confirmation
      Swal.fire({
        title: "Success!",
        text: `The message has been pinned: "${message}"`,
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});


show_battle_message.addEventListener("click", function() {
  // First prompt for the message to display
  Swal.fire({
    title: "What message would you like to send?",
    input: "text",
    inputPlaceholder: "Type your message here",
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(result => {
    if (result.value) {
      let message = result.value;

      // Second prompt for how long the message should be visible (in milliseconds)
      Swal.fire({
        title: "How long would you like this message to be visible for?",
        input: "number",
        inputAttributes: { min: 100, max: 10000 },
        inputValue: 1500, // Default value
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" }
      }).then(timeResult => {
        if (timeResult.value) {
          let duration = Math.max(100, Math.min(10000, parseInt(timeResult.value, 10) || 1500)); // Ensure valid time input

          // Show the message in the battle log for the specified duration
          Boot.prototype.game._state._current._battleController.textLog.showMessageForMs(duration, message);

          // Success confirmation
          Swal.fire({
            title: "Success!",
            text: `The message has been sent and will appear for ${duration} milliseconds.`,
            icon: "success",
            customClass: { container: "my-swal", popup: "my-popup" }
          });
        }
      });
    }
  });
});

get_all_pets.addEventListener("click", function() {
  Swal.fire({
    title: "Select Level for All Pets",
    input: "number",
    inputAttributes: { min: 1, max: 100 },
    inputValue: 100, // Default level set to 100
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(result => {
    if (result.value) {
      let level = Math.max(1, Math.min(100, parseInt(result.value, 10) || 100)); // Ensure valid level

      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to add all pets at level ${level}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" }
      }).then(confirmResult => {
        if (confirmResult.value) {
          let gameData = Boot.prototype.game._state.get("Boot")._gameData.pet;
          let kennel = Boot.prototype.game._state._current.user.source.kennel;

          gameData.forEach(petData => {
            // Check if pet is already in the kennel
            // let existingPet = kennel._petData.find(pet => pet.ID === petData.ID);
            // if (!existingPet) {
              // If pet is not in the kennel, create a new pet object and add it
            let newPet = {
              ID: petData.ID,
              catchDate: Date.now(),
              foreignSpells: [], // Add any required spells here if needed
              level: level, // Set the desired level for the new pet
              levelCaught: level,
              stars: 361, // Set initial stars (modify if needed)
              uniqueID: Math.random().toString(36).substr(2, 9) // Generate a unique ID
            };

            // Add the new pet to the kennel
            kennel._petData.push(newPet);
            // }
          });

          // Mark the kennel data as updated
          Boot.prototype.game._state._current.user.source._saveEnabled = true;
          Boot.prototype.game._state._current.user.source.kennel.updated = true;
          Boot.prototype.game._state._current.user.source.updated = true;
          Boot.prototype.game._state._current.user.source.forceSaveCharacter();

          Swal.fire({
            title: "Success!",
            text: `All pets have been added at level ${level}.`,
            icon: "success",
            customClass: { container: "my-swal", popup: "my-popup" }
          });
        }
      });
    }
  });
});



get_specific_pet.addEventListener("click", function() {
  let petData = Boot.prototype.game._state.get("Boot")._gameData.pet;
  let options = petData.map(pet => `<option value="${pet.ID}">${pet.data.name}</option>`).join("");

  Swal.fire({
    title: "Select Pet",
    html: `<select id="petSelect" class="swal2-select">${options}</select>`,
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" },
    didOpen: () => {
      document.getElementById("petSelect").focus();
    }
  }).then(result => {
    if (result.value) {
      let selectedID = document.getElementById("petSelect").value;
      let selectedPet = petData.find(pet => pet.ID == selectedID);
      let selectedPetName = selectedPet.data.name;
      let selectedPetLevel = selectedPet.level;

      Swal.fire({
        title: `Set Level for ${selectedPetName}`,
        input: "number",
        inputAttributes: { min: 1, max: 100 },
        inputValue: selectedPetLevel,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" }
      }).then(result => {
        if (result.value) {
          let level = Math.max(1, Math.min(100, parseInt(result.value, 10) || 1)); // Ensure valid level
          let userSource = Boot.prototype.game._state._current.user.source;
          let kennel = userSource.kennel;

          // Create the new pet object
          let newPet = {
            ID: selectedPet.ID, // Use selected pet's ID
            catchDate: Date.now(), // Timestamp for the catch date
            foreignSpells: [], // Add any foreign spells if needed
            level: level, // Set the level
            levelCaught: level, // Initially set the level caught to the same
            stars: 361, // Default stars, can be adjusted if necessary
            uniqueID: generateUniqueID() // Generate or assign a unique ID (you can define this function)
          };

          // Add the pet to the kennel
          kennel._petData.push(newPet);
          console.log(kennel._petData);

          // Save the data
          userSource._saveEnabled = true;
          userSource.kennel.updated = true;
          userSource.updated = true;
          userSource.forceSaveCharacter();

          Swal.fire({
            title: "Success!",
            text: `${selectedPetName} has been added to your kennel at level ${level}.`,
            icon: "success",
            customClass: { container: "my-swal", popup: "my-popup" }
          });
        }
      });
    }
  });
});

// Helper function to generate unique ID (you can modify this if needed)
function generateUniqueID() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}




get_specific_furniture.addEventListener("click", function() {
  let gameData = Boot.prototype.game._state._states.get("Boot")._gameData.dorm;
  let options = gameData.map(item => `<option value="${item.ID}">${item.name}</option>`).join("");

  Swal.fire({
    title: "Select Furniture",
    html: `<select id="furnitureSelect" class="swal2-select">${options}</select>`,
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" },
    didOpen: () => {
      document.getElementById("furnitureSelect").focus();
    }
  }).then(result => {
    if (result.value) {
      let selectedID = document.getElementById("furnitureSelect").value;
      let selectedName = gameData.find(item => item.ID == selectedID).name;

      Swal.fire({
        title: `Enter Quantity for ${selectedName}`,
        input: "number",
        inputAttributes: { min: 1 },
        inputValue: 1,
        showCancelButton: true,
        confirmButtonText: "Unlock",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" }
      }).then(result => {
        if (result.value) {
          let quantity = Math.max(1, parseInt(result.value, 10) || 1);
          let e = Boot.prototype.game._state._current.user.source;

          e.house.data.items[selectedID] = { A: [], N: quantity };
          e.house.updated = true;
          e.updated = true;

          Swal.fire({
            title: "Success!",
            text: `Unlocked ${quantity} of ${selectedName}.`,
            icon: "success",
            customClass: { container: "my-swal", popup: "my-popup" }
          });
        }
      });
    }
  });
});


get_all_furniture.addEventListener("click", function() {
  Swal.fire({
    title: "Unlock All Furniture",
    text: "Are you sure you want to unlock all furniture with an unlimited quantity?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Unlock",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(function(result) {
    if (result.value) {
      let e = Boot.prototype.game._state._current.user.source;
      e.house.data.items = {};
      Boot.prototype.game._state._states.get("Boot")._gameData.dorm.forEach(t => {
        e.house.data.items[t.ID] = { A: [], N: 999999999999999 };
      });
      e.house.updated = true;
      e.updated = true;

      Swal.fire({
        title: "Success!",
        text: "All furniture items have been unlocked.",
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});

get_all_gems.addEventListener("click", function() {
  Swal.fire({
    title: "Confirm Gems Addition",
    text: "Are you sure you want to add all gems to your backpack?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Add Gems",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" }
  }).then(function(result) {
    if (result.value) {
      let e = Boot.prototype.game._state._current.user.source;
      [3, 4, 10, 11, 17].forEach(t => {
        let a = e.backpack.data.key.find(e => e.ID === t);
        a ? a.N += 1 : e.backpack.data.key.push({ ID: t, N: 1 });
      });
      e.appearance.updated = true;
      e.updated = true;
      e.saveEnabled = true;
      e.forceSaveCharacter();
      e.appearanceChanged = true;
      e.backpack.updated = true;
      console.log("Attempted to add gems")
      Swal.fire({
        title: "Success!",
        text: "All gems have been added to your backpack.",
        icon: "success",
        customClass: { container: "my-swal", popup: "my-popup" }
      });
    }
  });
});

player_teleporter.addEventListener("click", function() {
  Swal.fire({
    title: "Select Zone",
    html: `<select id="zoneSelect" class="swal2-select"></select>`,
    showCancelButton: true,
    confirmButtonText: "Next",
    cancelButtonText: "Cancel",
    customClass: { container: "my-swal", popup: "my-popup" },
    didOpen: function() {
      var zoneSelect = document.getElementById("zoneSelect"),
          zones = Object.keys(Boot.prototype.game._state._current._world.zones);
          
      zones.forEach(zone => {
        var option = document.createElement("option"),
            zoneData = Boot.prototype.game._state._current._world.zones[zone];
        option.value = zone;
        option.textContent = zoneData.name || zone;
        zoneSelect.appendChild(option);
      });
    }
  }).then(function(result) {
    if (result.value) {
      var selectedZone = document.getElementById("zoneSelect").value,
          maps = Object.keys(Boot.prototype.game._state._current._world.zones[selectedZone].maps);

      Swal.fire({
        title: "Select Map",
        html: `<select id="mapSelect" class="swal2-select"></select>`,
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        customClass: { container: "my-swal", popup: "my-popup" },
        didOpen: function() {
          var mapSelect = document.getElementById("mapSelect");
          maps.forEach(map => {
            var option = document.createElement("option"),
                mapData = Boot.prototype.game._state._current._world.zones[selectedZone].maps[map];
            option.value = map;
            option.textContent = `${map} - ${mapData.name || map}`;
            mapSelect.appendChild(option);
          });
        }
      }).then(function(result) {
        if (result.value) {
          var selectedMap = document.getElementById("mapSelect").value; // ✅ Fix: Get value before moving to next step
          var mapTag = Boot.prototype.game._state._current._world.zones[selectedZone].maps[selectedMap].zoneName; // ✅ Now this won't be null

          Swal.fire({
            title: "Enter Coordinates",
            html: `<input type="text" id="positionInput" value="500, 500" class="swal2-input">`,
            showCancelButton: true,
            confirmButtonText: "Teleport",
            cancelButtonText: "Cancel",
            customClass: { container: "my-swal", popup: "my-popup" }
          }).then(function(result) {
            if (result.value) {
              var coords = document.getElementById("positionInput").value.split(",").map(n => parseInt(n.trim(), 10));
              if (isNaN(coords[0]) || isNaN(coords[1])) {
                Swal.fire({ title: "Error", text: "Invalid coordinates.", icon: "error", customClass: { container: "my-swal", popup: "my-popup" } });
                return;
              }

              Boot.prototype.game._state._current._world.zones[selectedZone].teleport(mapTag.substring(mapTag.indexOf("-") + 1), coords[0], coords[1], {}, {});

              Swal.fire({ title: "Success!", text: `Teleported to ${mapTag} at (${coords[0]}, ${coords[1]})`, icon: "success", customClass: { container: "my-swal", popup: "my-popup" } });
            }
          });
        }
      });
    }
  });
});



set_custom_player_level.addEventListener("click", function() {
  Swal.fire({
    title: "Set Custom Player Level",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      let level = parseInt(result.value);
      if (isNaN(level)) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid number",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return;
      }

      Boot.prototype.game._state._current.user.source.getPlayerData().level = level;
      Boot.prototype.game._state._current.user.source.data.level = level;
      Boot.prototype.game._state._current.user.source.getLevel = () => level;
      
      Swal.fire({
        title: "Success",
        text: "Custom Player level set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});


get_specific_epic_buddy.addEventListener("click", function () {
  const followPets = [
    { ID: 125, assetID: 270, name: "Big Hex" },
    { ID: 126, assetID: 271, name: "Florafox" },
    { ID: 127, assetID: 272, name: "Arctursus" },
    { ID: 128, assetID: 273, name: "Diveodile" },
    { ID: 129, assetID: 274, name: "Magmischief" },
    { ID: 134, assetID: 1261, name: "Chill & Char" },
    { ID: 135, assetID: 1263, name: "Tidus" },
    { ID: 136, assetID: 1283, name: "Luma" },
    { ID: 137, assetID: 1284, name: "Eclipse" }
  ];

  let options = followPets.map(pet => `<option value="${pet.ID}">${pet.name}</option>`).join("");

  Swal.fire({
    title: "Select an Epic",
    html: `<select id="epicSelect" class="swal2-select">${options}</select>`,
    showCancelButton: true,
    confirmButtonText: "Add Epic",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    didOpen: () => {
      document.getElementById("epicSelect").focus();
    }
  }).then((result) => {
    if (result.value) {
      const selectedID = parseInt(document.getElementById("epicSelect").value);
      const pet = followPets.find(p => p.ID === selectedID);

      if (pet) {
        const backpack = Boot.prototype.game._state._current.user.source.backpack.data;
        if (!backpack.follow) backpack.follow = [];

        backpack.follow.push({
          ID: pet.ID,
          assetID: pet.assetID,
          N: 1,
          defence: 0,
          hp: 0,
          power: 0,
          speed: 40,
          type: "follow"
        });

        Boot.prototype.game._state._current.user.source.updated = true;
        Boot.prototype.game._state._current.user.source.backpack.updated = true;

        Swal.fire({
          title: 'Success!',
          text: `${pet.name} has been added successfully.`,
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
      }
    }
  });
});


get_all_epic_buddies.addEventListener("click", function () {
  Swal.fire({
    title: "Add All Epics?",
    text: "This will add all epics to your backpack.",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Add Epics",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function (result) {
    if (result.value) {
      const backpack = Boot.prototype.game._state._current.user.source.backpack.data;
      if (!backpack.follow) backpack.follow = [];

      const followPets = [
        { ID: 125, assetID: 270, name: "Big Hex" },
        { ID: 126, assetID: 271, name: "Florafox" },
        { ID: 127, assetID: 272, name: "Arctursus" },
        { ID: 128, assetID: 273, name: "Diveodile" },
        { ID: 129, assetID: 274, name: "Magmischief" },
        { ID: 134, assetID: 1261, name: "Chill & Char" },
        { ID: 135, assetID: 1263, name: "Tidus" },
        { ID: 136, assetID: 1283, name: "Luma" },
        { ID: 137, assetID: 1284, name: "Eclipse" }
      ];

      followPets.forEach(pet => {
        backpack.follow.push({
          ID: pet.ID,
          assetID: pet.assetID,
          N: 1,
          defence: 0,
          hp: 0,
          power: 0,
          speed: 40,
          type: "follow"
        });
      });

      Boot.prototype.game._state._current.user.source.updated = true;
      Boot.prototype.game._state._current.user.source.backpack.updated = true;

      Swal.fire({
          title: 'Success!',
          text: "All epics have been added successfully.",
          icon: 'success',
          customClass: {
            container: 'my-swal',
            popup: 'my-popup'
          }
        });
    }
  });
});

exit_battle.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will kick player out of their current battle!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Exit Player",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      if (Boot.prototype.game._state.current === 'SecureBattleRevamp') {
        Boot.prototype.game._state._current.init();
      };
    }
  });
});

remove_monsters.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This hack is still being tested, are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Remove Monsters",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      var a = Boot.prototype.game._state._current._world.getCurrentZone(),
      b = Boot.prototype.game._state._current._world.getCurrentMap(),
      c = Boot.prototype.game._state._current._world.zones[a].maps[b.split("-")[1]].mapMonsters,
      d = -1;
      
      c.forEach(function(e) {
          if (e && e.data && e.monsterData) {
              e.data.ID = d;
              e.monsterData.ID = d;
          }
      });
      
      Boot.prototype.game._state._current.user.source.state.updated = true;
      Boot.prototype.game._state._current.user.source.updated = true;
      
      // Save current zone, map, and player coordinates
      var current_zone_id = Boot.prototype.game._state._current._world.getCurrentZone();
      var current_map_tag = Boot.prototype.game._state._current._world.getCurrentMapTag();
      var current_x_pos = Boot.prototype.game._state._current.user.position._x;
      var current_y_pos = Boot.prototype.game._state._current.user.position._y;
      
      // Teleport to the exact same spot to refresh
      Boot.prototype.game._state._current._world.zones[current_zone_id].teleport(current_map_tag, current_x_pos, current_y_pos, {}, {});
      
      // Small timeout to ensure everything processes smoothly
      setTimeout(function() {
          console.log("All monsters in area have been removed!")
      }, 100); // 100ms delay to ensure teleport completes
    }
  });
});

getAllItemsButton.addEventListener("click", function() {
  Swal.fire({
    title: "Unlock All Items",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Unlock",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 1e308 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 1e308",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      unlockAllItems(result.value);
        Swal.fire({
  title: "Success!",
  text: `Succesfully unlocked all items with amount ${result.value}`,
  icon: "success",
  customClass: {
    container: "my-swal",
    popup: "my-popup"
  }
});
    }
  });
});

clearAllItemsButton.addEventListener("click", function() {
  Swal.fire({
    title: "Clear All Items",
    showCancelButton: true,
    confirmButtonText: "Clear",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      clearAllItems();
        Swal.fire({
  title: "Success!",
  text: "All items cleared successfully.",
  icon: "success",
  customClass: {
    container: "my-swal",
    popup: "my-popup"
  }
});
    }
  });
});

// Function to unlock all items
function unlockAllItems(quantity=value) {
  var types = [
    "boots",
    "currency",
    "fossil",
    "hat",
    "item",
    "key",
    "mount",
    "outfit",
    "relic",
    "spellRelic",
    "weapon",
    "follow"
  ];

  types.forEach(type => {
    var itemType = `Boot.prototype.game._state._current.user.source.backpack.data.${type}`;

    if (!eval(itemType)) {
      eval(`${itemType} = []`);
    }

    eval(`${itemType}.length = 0`);

    var itemsData = Boot.prototype.game._state._states.get("Boot")._gameData[type];

    var excludedIDs = []
    if (type === "follow") {
      excludedIDs = [125, 126, 127, 128, 129, 134, 135, 136, 137]
    }

    itemsData.forEach(item => {
      if (!(type === "follow" && excludedIDs.includes(item.ID))) {
        eval(`${itemType}.push({ "ID": item.ID, "N": quantity })`);
      }
    });

  });


  // Set backpack updated to true to indicate changes
  Boot.prototype.game._state._current.user.source.backpack.updated = true;

  Swal.fire({
    title: "Success!",
    text: "All items unlocked successfully.",
    icon: "success",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  });
}

// Function to clear all items
function clearAllItems() {
  var types = [
    "boots",
    "currency",
    "fossil",
    "hat",
    "item",
    "key",
    "mount",
    "outfit",
    "relic",
    "spellRelic",
    "weapon",
    "follow"
  ];

  types.forEach(type => {
    var itemType = `Boot.prototype.game._state._current.user.source.backpack.data.${type}`;
    eval(`${itemType} = []`);
  });

  // Set backpack updated to true to indicate changes
  Boot.prototype.game._state._current.user.source.backpack.updated = true;

  console.log(`Cleared all items.`);
}
    
SetPlayerCustomNameButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Custom Player Name",
    input: "text",
    inputPlaceholder: "Enter custom name",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(result => {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getName = () => {
        return result.value;
      };
      Boot.prototype.game._state._current.user.source.appearanceChanged = true;
      Swal.fire({
        title: "Success",
        text: "Custom name set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});

setPlayerNameButton.addEventListener("click", function () {
    changeName('first');
});

basicMembershipToggle.addEventListener("click", function() {
    if (this.checked) {
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return true;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 101};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    reloadSave()
    Swal.fire({
      title: "Basic Membership Enabled",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.hasMembership = function() {
      return false;
    };
    _._segment._activePlayer._player.getMemberTier = () => {return 0};
    Boot.prototype.game._state._current.user.source.appearanceChanged = true;
    Swal.fire({
      title: "Basic Membership Disabled",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});
    
 fixMorphCrashButton.addEventListener("click", function() {
  Boot.prototype.game._state._current.user.source.getPlayerData().playerTransformation = void 0;
  Boot.prototype.game._state._current.user.source.appearanceChanged = true;
  Boot.prototype.game._state._current.user._morphTransformation.clearMorphedAppearance();
  Boot.prototype.game._state._current.user._morphTransformation.clearMorphedAppearanceWithoutEffect();
  Swal.fire({
    title: "Success",
    text: "Morph glitch fixed",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  });
});   
    
setPlayerMorphButton.addEventListener("click", function () {
  Swal.fire({
    title: 'Which morph type?',
    input: 'select',
    inputOptions: {
      pet: 'Pet',
      dorm: 'Furniture',
      follow: 'Follow',
    },
    inputPlaceholder: 'Morph Type',
    inputValidator: (e) => e ? '' : 'Please select a morph type.',
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Continue',
    customClass: {
      container: 'my-swal',
      popup: 'my-popup'
    }
  }).then((result) => {
    if (!result.value) {
      return;
    }
    var morphType = result.value;
    var options = {};
    Boot.prototype.game._state._states.get('Boot')._gameData[morphType].forEach((e) => {
      options[e.ID] = `${e.data.name} (${e.ID})`;
    });
    Swal.fire({
      title: 'Which morph?',
      input: 'select',
      inputOptions: options,
      inputPlaceholder: 'Morph ID',
      inputValidator: (e) => e ? '' : 'Please select a morph ID.',
      showCancelButton: true,
      customClass: {
        container: 'my-swal',
        popup: 'my-popup'
      }
    }).then((result) => {
      if (!result.value) {
        return;
      }
      var morphID = result.value;
      Boot.prototype.game._state._current.user.source.getPlayerData().playerTransformation = {
        transformType: morphType,
        transformID: morphID,
        maxTime: 36e5,
        timeRemaining: 36e5,
      };
        Boot.prototype.game._state._current.user._morphTransformation.createMorphAppearance();
      Boot.prototype.game._state._current.user.source.appearanceChanged = true;
      Swal.fire({
        title: 'Morphed!',
        text: 'You\'ve been morphed.',
        icon: 'success',
        customClass: {
          container: 'my-swal',
          popup: 'my-popup'
        }
      });
    });
  });
});
    var sizeInterval = null;

   setPlayerSizeButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Player Size",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 0 || e > 3) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid number between 0 and 3",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    },
    footer: "The default size is 1"
  }).then(function(result) {
    if (result.value) {
      let newSize = parseFloat(result.value);
      if (sizeInterval) {
        clearInterval(sizeInterval);
      }
      sizeInterval = setInterval(() => {
        Boot.prototype.game._state._current.user.worldScale.set(newSize, newSize);
        Boot.prototype.game._state._current.user.scale.set(newSize, newSize);
      }, 50);
      Swal.fire({
        title: "Success",
        text: "Player size set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
    
togglePauseGameButton.addEventListener("click", function() {
  Boot.prototype.game.paused = !Boot.prototype.game.paused;
  if (Boot.prototype.game.paused) {
    Swal.fire({
      title: "Game Paused",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  } else {
    Swal.fire({
      title: "Game Resumed",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
  }
});
    
crashGameButton.addEventListener("click", function() {
  Swal.fire({
    title: "Warning!",
    text: "This will crash your game! Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Crash Game",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.shutdown();
    setInterval(function() { Boot.prototype.game.paused = true }, 50);
    }
  });
});
    
    hideNameToggle.addEventListener("change", function() {
  if (this.checked) {
    Swal.fire({
      title: "Player Name Hidden",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    hideNameInterval = setInterval(() => {
      Boot.prototype.game._state._current.user.hideName();
    }, 50); // adjust the interval to a reasonable value
  } else {
    Swal.fire({
      title: "Player Name Shown",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    clearInterval(hideNameInterval);
    Boot.prototype.game._state._current.user.showName();
  }
});
    
spinButton.addEventListener("click", function() {
  Boot.prototype.game._state._current.user.source.canSpin = function() {
    return true;
  };
  Swal.fire({
    title: "Success",
    text: "Unlimited spins enabled",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    }
  });
});
  noclipToggle.addEventListener("change", function() {
    if (this.checked) {
      Swal.fire({
        title: "Noclip Enabled",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
      previousAreaState = Boot.prototype.game._state._current.area.map(e => e.slice());
      NoclipInterval = setInterval(() => {
        for (var e = Boot.prototype.game._state._current.area, t = 0; t < e.length; t++) e[t] = Array(64).fill(1);
      }, 50);
    } else {
      Swal.fire({
        title: "Noclip Disabled",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
      clearInterval(NoclipInterval);
      for (var e = Boot.prototype.game._state._current.area, t = 0; t < e.length; t++) e[t] = previousAreaState[t];
    }
  });

saveGameButton.addEventListener("click", function() {
  var currentState = Boot.prototype.game._state._current;
  currentState.update();
  currentState.updateOnFaintData();
  currentState.updatePlayer(currentState.user.source.userID);
  currentState.screenUpdate();
  
  var user = currentState.user;
  user.update();
  user.updateTransform();
  user.updateMountAppearance();
  user.source.updated = true;
  user.source.appearance.updated = true;
  user.source.appearanceChanged = true;
  user.source.saveEnabled = true;
  user.source._saveEnabled = true;
  user.source.forceSaveCharacter();
  user.source.backpack.updated = true;
  user.source.kennel.updated = true;
  
  Swal.fire({
          title: "Success",
          text: "Game saved succesfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
});
    
  invisibilityToggle.addEventListener("change", function() {
    if (this.checked) {
      Swal.fire({
        title: "Invisibility Enabled",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
      invisibilityInterval = setInterval(() => {
        Boot.prototype.game._state._current.user.visible = false;
      }, 50);
    } else {
      Swal.fire({
        title: "Invisibility Disabled",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
      clearInterval(invisibilityInterval);
      Boot.prototype.game._state._current.user.visible = true;
    }
  });

  setGoldButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Gold",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 1e7 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 10,000,000",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(e) {
    if (e.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().gold = parseInt(e.value);
      Boot.prototype.game._state._current.user.source.data.gold = parseInt(e.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Gold set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
setBountyScoreButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Bounty Score",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 0 || e > 1e308 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 0 and e+308",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().bountyScore = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.data.bountyScore = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Bounty score set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
setPlayerLevelButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Player Level",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 100 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 100",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().level = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.data.level = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Player level set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
setGradeButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Grade",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 8 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 8",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.educationData.grade = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.educationData.chosenGrade = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.grade = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Grade set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});

let walkSpeedInterval = null;
let customWalkSpeed = null; // store custom walkspeed value

teleportClickToggle.addEventListener("change", function() {
  if (this.checked) {
    Swal.fire({
      title: "Teleport Click Enabled",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    startWalkSpeedInterval(true);
  } else {
    Swal.fire({
      title: "Teleport Click Disabled",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        container: "my-swal",
        popup: "my-popup"
      }
    });
    stopWalkSpeedInterval();
    if (customWalkSpeed !== null) {
      // restore custom walkspeed value when teleport click is disabled
      Boot.prototype.game._state._current.user.walkSpeed = customWalkSpeed;
      customWalkSpeed = null;
    } else {
      // set walkspeed to default value (1.5) if no custom value is set
      Boot.prototype.game._state._current.user.walkSpeed = 1.5;
    }
  }
});
    
setPlayerWalkspeedButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Walkspeed",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 0 || e > 1e308 || !/^-?\d+(\.\d+)?$/.test(e)) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid decimal number between 0 and e+308",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    },
    footer: "The default walkspeed is 1.5"
  }).then(function(result) {
    if (result.value) {
      if (teleportClickToggle.checked) {
        // store custom walkspeed value when teleport click is enabled
        customWalkSpeed = parseFloat(result.value);
      } else {
        Boot.prototype.game._state._current.user.walkSpeed = parseFloat(result.value);
      }
      Swal.fire({
        title: "Success",
        text: "Walkspeed set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});

function startWalkSpeedInterval(teleportClickEnabled, customWalkSpeedValue) {
  if (walkSpeedInterval) {
    clearInterval(walkSpeedInterval);
  }
  walkSpeedInterval = setInterval(() => {
    if (teleportClickEnabled) {
      // prioritize custom walkspeed when teleport click is enabled
      Boot.prototype.game._state._current.user.walkSpeed = customWalkSpeedValue || 1e100;
    } else {
      Boot.prototype.game._state._current.user.walkSpeed = customWalkSpeedValue || 1.5;
    }
  }, 50);
}

function stopWalkSpeedInterval() {
  if (walkSpeedInterval) {
    clearInterval(walkSpeedInterval);
  }
}
    
setPlayerMemberStarsButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Member Stars",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 0 || e > 1e308 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 0 and e+308",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().storeMemberStars = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.data.storedMemberStars = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Member stars set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});
setTowerButton.addEventListener("click", function() {
  Swal.fire({
    title: "Set Dark Tower Level",
    input: "number",
    inputPlaceholder: "",
    showCancelButton: true,
    confirmButtonText: "Set",
    cancelButtonText: "Cancel",
    customClass: {
      container: "my-swal",
      popup: "my-popup"
    },
    inputValidator: function(e) {
      if (!e || isNaN(e) || e < 1 || e > 1000 || e % 1 != 0) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid whole number between 1 and 1000",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: "my-popup"
          }
        });
        return false;
      }
    }
  }).then(function(result) {
    if (result.value) {
      Boot.prototype.game._state._current.user.source.getPlayerData().tower = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.data.tower = parseInt(result.value);
      Boot.prototype.game._state._current.user.source.updated = true;
      Swal.fire({
        title: "Success",
        text: "Dark Tower level set successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          container: "my-swal",
          popup: "my-popup"
        }
      });
    }
  });
});

  // Create toggle menu button
  var toggleMenu = document.createElement("div");
  toggleMenu.id = "toggleMenu";
  document.body.appendChild(toggleMenu);

  toggleMenu.onclick = function() {
    if (cheatMenu.classList.contains("hidden")) {
      cheatMenu.classList.remove("hidden");
      cheatMenu.classList.add("visible");
      toggleMenu.classList.add("rotated");
    } else {
      cheatMenu.classList.remove("visible");
      cheatMenu.classList.add("hiding");
      toggleMenu.classList.remove("rotated");
      setTimeout(function() {
        cheatMenu.classList.remove("hiding");
        cheatMenu.classList.add("hidden");
      }, 250);
    }
  };

};

