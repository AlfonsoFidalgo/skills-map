type UserInfoProps = {
  name: string;
  location?: string;
  occupation?: string;
};

export default function UserInfo({
  name,
  location,
  occupation,
}: UserInfoProps) {
  return (
    <div className="flex flex-col justify-center items-start gap-1">
      <h2 className="sm:text-3xl text-2xl font-bold mb-1">{name}</h2>
      {occupation && <p className="text-md">{occupation}</p>}
      {location && <p className="text-sm text-gray-500">{location}</p>}
    </div>
  );
}
