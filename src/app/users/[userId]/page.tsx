interface UserPageProps {
  params: {
    userId: string;
  };
}

const UserPage = ({ params }: UserPageProps) => {
  return <div>User ID: {params.userId}</div>;
};

export default UserPage;