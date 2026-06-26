const DASHBOARD_URL = "https://dashboard-visual-o7vv.onrender.com/";

const UserData: React.FC = () => (
  <div className="h-full w-full">
    <iframe
      src={DASHBOARD_URL}
      title="User Data Dashboard"
      className="w-full h-full border-0"
      loading="lazy"
      allow="fullscreen"
    />
  </div>
);

export default UserData;
