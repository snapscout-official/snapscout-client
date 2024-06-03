import { logoutUser } from "@/app/actions/authentication";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

async function Dashboard() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form action={logoutUser}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}

export default Dashboard;
