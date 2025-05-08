'use client';

import { useOrganization } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/boardlist";

const DashboardPage = () => {
  const { organization } = useOrganization();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const favourites = searchParams.get("favourites");

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto p-6 bg-background">
      
          {/* {JSON.stringify({ search, favourites })} */}
        
        {!organization ? (
          <EmptyOrg />
        ) : (
          <BoardList
            search={search}
            favourites={favourites}
            organizationId={organization.id}
            />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
