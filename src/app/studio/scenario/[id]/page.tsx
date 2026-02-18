import { notFound } from "next/navigation";
import { getScenario } from "@/lib/scenarios";
import { ScenarioDetailClient } from "./ScenarioDetailClient";

interface ScenarioPageProps {
  params: Promise<{ id: string }>;
}

export default async function ScenarioPage({ params }: ScenarioPageProps) {
  const { id } = await params;
  const scenario = getScenario(id);

  if (!scenario) {
    notFound();
  }

  return <ScenarioDetailClient scenario={scenario} />;
}

// Generate static params for all scenarios
export async function generateStaticParams() {
  const { getAllScenarios } = await import("@/lib/scenarios");
  const scenarios = getAllScenarios();
  
  return scenarios.map((scenario) => ({
    id: scenario.id,
  }));
}
