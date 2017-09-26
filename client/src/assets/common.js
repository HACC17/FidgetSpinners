var statueRef = null;

function callShoutMe(ref, val) {
  ref.shoutMe(val);
}

function callFromLink(val) {
  statueRef.shoutMe(val);
}

function shareText(txt) {
  try {
    window.plugins.intentShim.startActivity(
      {
        action: window.plugins.intentShim.ACTION_SEND,
        text: txt,
        extras: {
          "android.intent.extra.TEXT": txt
        },
        type: 'text/plain'
      },
      function(){},
      function (msg) {
        alert('Error: ' + msg)
      }
    );
  } catch (e) {
    alert("Exception: " + e.message);
  }
}
