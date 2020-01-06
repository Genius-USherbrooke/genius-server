import request from 'request';
import Logger from '../../logger/Logger';
import PushMessage from '../../types/PushMessage';

const EXPO_SEND_NOTIFICATION_URL = 'https://exp.host/--/api/v2/push/send';

export namespace NotificationService {
    
    export async function sendNotification(pushMessage: PushMessage): Promise<void> {
        request.post({
                         url: EXPO_SEND_NOTIFICATION_URL,
                         headers: {
                             'Content-Type': 'application/json'
                         },
                         body: JSON.stringify(pushMessage)
                     },
                     (error, response) => {
                         if (response.statusCode === 200) {
                             Logger.info(`Notification sent with token:[${pushMessage.to}] and title:[${pushMessage.title}]`);
                         } else {
                             Logger.error(`Notification not send successfully with token:[username] and title:[${pushMessage.title}]`);
                         }
                     });
    }
}
