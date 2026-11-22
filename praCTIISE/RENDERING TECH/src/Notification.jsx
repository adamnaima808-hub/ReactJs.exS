const Notification = ({ unreadMessages }) => {
   return(
      <div>
         <h1>Notifications</h1>
            {unreadMessages.length > 0 && (
            <p>You have {unreadMessages.length} unread messages.</p>
            )}
      </div>
   )
}

export default Notification;
