type PushMessage = {
    /**
     * An Expo push token or an array of Expo push tokens specifying the recipient(s)
     * of this message.
     */
    to: string | string[],
    
    /**
     * A JSON object delivered to your app. It may be up to about 4KiB; the total
     * notification payload sent to Apple and Google must be at most 4KiB or else
     * you will get a "Message Too Big" error.
     */
    data?: Object,
    
    /**
     * The title to display in the notification. Devices often display this in
     * bold above the notification body. Only the title might be displayed on
     * devices with smaller screens like Apple Watch.
     */
    title?: string,
    
    /**
     * The message to display in the notification
     */
    body?: string,
    
    /**
     * Time to Live: the number of seconds for which the message may be kept
     * around for redelivery if it hasn't been delivered yet. Defaults to
     * `undefined` in order to use the respective defaults of each provider.
     * These are 0 for iOS/APNs and 2419200 (4 weeks) for Android/FCM and web
     * push notifications.
     *
     * On Android, we make a best effort to deliver messages with zero TTL
     * immediately and do not throttle them.
     *
     * However, note that setting TTL to a low value (e.g. zero) can prevent
     * normal-priority notifications from ever reaching Android devices that are
     * in doze mode. In order to guarantee that a notification will be delivered,
     * TTL must be long enough for the device to wake from doze mode.
     *
     * This field takes precedence over `expiration` when both are specified.
     */
    ttl?: number,
    
    /**
     * A timestamp since the UNIX epoch specifying when the message expires. This
     * has the same effect as the `ttl` field and is just an absolute timestamp
     * instead of a relative time.
     */
    expiration?: number,
    
    /**
     * The delivery priority of the message. Specify "default" or omit this field
     * to use the default priority on each platform, which is "normal" on Android
     * and "high" on iOS.
     *
     * On Android, normal-priority messages won't open network connections on
     * sleeping devices and their delivery may be delayed to conserve the battery.
     * High-priority messages are delivered immediately if possible and may wake
     * sleeping devices to open network connections, consuming energy.
     *
     * On iOS, normal-priority messages are sent at a time that takes into account
     * power considerations for the device, and may be grouped and delivered in
     * bursts. They are throttled and may not be delivered by Apple. High-priority
     * messages are sent immediately. Normal priority corresponds to APNs priority
     * level 5 and high priority to 10.
     */
    priority?: 'default' | 'normal' | 'high',
    
    // iOS-specific fields
    
    /**
     * The subtitle to display in the notification below the title
     */
    subtitle?: string,
    
    /**
     * A sound to play when the recipient receives this notification. Specify
     * "default" to play the device's default notification sound, or omit this
     * field to play no sound.
     *
     * Note that on apps that target Android 8.0+ (if using `expo build`, built
     * in June 2018 or later), this setting will have no effect on Android.
     * Instead, use `channelId` and a channel with the desired setting.
     */
    sound?: 'default' | null,
    
    /**
     * Number to display in the badge on the app icon. Specify zero to clear the
     * badge.
     */
    badge?: number,
    
    /**
     * ID of the Notification Category through which to display this notification.
     *
     * To send a notification with category to the Expo client, prefix the string
     * with the experience ID (`@user/experienceId:yourCategoryId`). For standalone/ejected
     * applications, use plain `yourCategoryId`.
     */
    _category?: string,
    
    /**
     * Displays the notification when the app is foreground.
     * Defaults to `false`.
     */
    _displayInForeground?: boolean
    
    // Android-specific fields
    
    /**
     * ID of the Notification Channel through which to display this notification
     * on Android devices. If an ID is specified but the corresponding channel
     * does not exist on the device (i.e. has not yet been created by your app),
     * the notification will not be displayed to the user.
     *
     * If left null, a "Default" channel will be used, and Expo will create the
     * channel on the device if it does not yet exist. However, use caution, as
     * the "Default" channel is user-facing and you may not be able to fully
     * delete it.
     */
    channelId?: string,
    
    // Web-specific fields
    
    /**
     * The web path that will be opened/focused after the user clicks the
     * notification.
     * Defaults to "/" (root)
     */
    webPath?: string,
    
    /**
     * URL or `mailto:` URL which provides a point of contact in case the
     * push service needs to contact the message sender.
     * Defaults to the value stored on Expo's server.
     * Learn more here: https://docs.expo.io/versions/latest/guides/using-vapid/
     */
    vapidSubject?: string,
    
    /**
     * When a new notification is shown with the same tag, any old notifications
     * with that tag are removed before the new notification is shown.
     * Defaults to none, which means the new notification will not replace any
     * old notifications.
     */
    _tag?: string,
    
    /**
     * Only applicable when `_tag` is set.
     * Whether a new notification of the same tag will play a sound, vibrate and
     * wake up the users device.
     * Defaults to `false`, which means that the new notification replacing an
     * existing one (i.e., with the same `_tag`) will have no sound, vibration
     * and the screen is kept asleep.
     */
    _renotify?: boolean
}

export default PushMessage;
