exports.getPermissions = function(opt) {
    if (OS_ANDROID) {
        // Android part
        var permissions = ['android.permission.CAMERA', 'android.permission.READ_EXTERNAL_STORAGE'];
        var hasPermission = Ti.Android.hasPermission(permissions);
 
        // check if the permissions are already allowed
        if (hasPermission) {
            // run callback
            opt();
            return;
        }
        // no permission - request it
        Ti.Android.requestPermissions(permissions, function(e) {
            if (e.successs) {
                // run callback
                opt();
            } else {
                // ask again
                exports.getPermissions(opt);
            }
        });
    } else {
        // iOS part
        var map = {};
        map[Ti.Media.CAMERA_AUTHORIZATION_AUTHORIZED] = 'CAMERA_AUTHORIZATION_AUTHORIZED';
        map[Ti.Media.CAMERA_AUTHORIZATION_DENIED] = 'CAMERA_AUTHORIZATION_DENIED';
        map[Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED] = 'CAMERA_AUTHORIZATION_RESTRICTED';
        map[Ti.Media.CAMERA_AUTHORIZATION_NOT_DETERMINED] = 'CAMERA_AUTHORIZATION_NOT_DETERMINED';
 
        var cameraAuthorization = Ti.Media.cameraAuthorization;
        if (cameraAuthorization === Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED) {
            return;
        } else if (cameraAuthorization === Ti.Media.CAMERA_AUTHORIZATION_DENIED) {
            return;
        }
        Ti.Media.requestCameraPermissions(function(e) {
            if (e.success) {
                // run callback
                opt();
            } else {
                // ask again
                exports.getPermissions(opt);
            }
        });
    }
};