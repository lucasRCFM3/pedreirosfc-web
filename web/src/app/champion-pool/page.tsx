import { getLatestDDVersion } from "@/lib/riot";
import { getAllChampions } from "@/lib/champions";
import { EditableChampionPool } from "@/components/EditableChampionPool";

export default async function ChampionPoolPage(props: { searchParams: Promise<{ role?: string }> }) {
  const searchParams = await props.searchParams;
  const activeRole = (searchParams.role as string) || 'adc';
  const version = await getLatestDDVersion();
  const allChampions = await getAllChampions(version);

  return (
    <EditableChampionPool 
      initialRole={activeRole}
      version={version}
      allChampions={allChampions}
    />
  );
}

