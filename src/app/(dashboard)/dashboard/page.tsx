import { foo, logoutUser } from "@/app/actions/authentication";
import { Button } from "@/components/ui/button";

async function Dashboard() {
  const data = await foo();
  return (
    <div>
      {JSON.stringify(data)}
      <form action={logoutUser}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}

export default Dashboard;
