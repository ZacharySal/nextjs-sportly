import View from "../../../components/MLB/views/Home";

export default async function Page({ params }: { params: { date: string } }) {
  return <View date={params.date} />;
}
