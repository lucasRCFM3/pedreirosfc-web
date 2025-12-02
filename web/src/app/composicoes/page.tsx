import { getLatestDDVersion } from "@/lib/riot";
import { getAllChampions } from "@/lib/champions";
import { EditableCompositions } from "@/components/EditableCompositions";

export default async function ComposicoesPage() {
  const version = await getLatestDDVersion();
  const allChampions = await getAllChampions(version);

  return (
    <EditableCompositions 
      version={version}
      allChampions={allChampions}
    />
  );
}
