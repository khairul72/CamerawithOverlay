var helper = require("/helper");
var overlay = Ti.UI.createView({});

var close_button = Ti.UI.createButton({
    width: 40,
    height: 40,
    backgroundColor: "red"
});
close_button.addEventListener("click", function() {
    Ti.Media.hideCamera();
});
overlay.add(close_button);

function onClickCamera(e) {
	helper.getPermissions(function() {
		Ti.Media.showCamera({
			success : function(e) {
				console.log(e.media);
			}
		});
	});
}

function onOverlaywithControl(e) {
	helper.getPermissions(function() {
		Ti.Media.showCamera({
        mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
        showControls: true,
        overlay: overlay,
        success:function(e) {
            console.log("\n success");
        },
        cancel: function() {
            console.log("cancel");
        },
        error:function(error) {
            console.log("error");
        }
    });
		
	});
}

function onOverlaywithoutControl(e) {
	helper.getPermissions(function() {
		Ti.Media.showCamera({
        mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
        showControls: false,
        overlay: overlay,
        success:function(e) {
            console.log("\n success");
        },
        cancel: function() {
            console.log("cancel");
        },
        error:function(error) {
            console.log("error");
        }
    });
		
	});
}

$.btn_overlay_with_control.addEventListener("click", onOverlaywithControl);

$.btn_overlay_without_control.addEventListener("click", onOverlaywithoutControl);

$.btn_camera.addEventListener("click", onClickCamera);

$.index.open(); 