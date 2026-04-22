"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getClients,
  saveClients,
  generateId,
} from "@/lib/store";
import type { Client, CoachingSession, Assessment } from "@/types/client";

export async function addClient(formData: FormData) {
  const clients = await getClients();
  const id = generateId();

  const newClient: Client = {
    id,
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: (formData.get("email") as string) || "",
    birthDate: (formData.get("birthDate") as string) || null,
    gender: (formData.get("gender") as string) || "",
    program: (formData.get("program") as string) || "",
    registeredAt: new Date().toISOString(),
    notes: (formData.get("notes") as string) || "",
    sessions: [],
    assessments: [],
  };

  clients.push(newClient);
  await saveClients(clients);
  redirect(`/dashboard/clients/${id}`);
}

export async function updateClient(formData: FormData) {
  const clients = await getClients();
  const id = formData.get("id") as string;
  const index = clients.findIndex((c) => c.id === id);

  if (index === -1) redirect("/dashboard/clients");

  clients[index] = {
    ...clients[index],
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: (formData.get("email") as string) || "",
    birthDate: (formData.get("birthDate") as string) || null,
    gender: (formData.get("gender") as string) || "",
    program: (formData.get("program") as string) || "",
    notes: (formData.get("notes") as string) || "",
  };

  await saveClients(clients);
  revalidatePath(`/dashboard/clients/${id}`);
  redirect(`/dashboard/clients/${id}`);
}

export async function deleteClient(formData: FormData) {
  const id = formData.get("id") as string;
  const clients = (await getClients()).filter((c) => c.id !== id);
  await saveClients(clients);
  redirect("/dashboard/clients");
}

export async function addSession(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const clients = await getClients();
  const client = clients.find((c) => c.id === clientId);

  if (!client) redirect("/dashboard/clients");

  const session: CoachingSession = {
    id: generateId(),
    date: formData.get("date") as string,
    sessionNumber: client!.sessions.length + 1,
    duration: Number(formData.get("duration")) || 50,
    content: formData.get("content") as string,
    notes: (formData.get("notes") as string) || "",
  };

  client!.sessions.push(session);
  await saveClients(clients);
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}`);
}

export async function deleteSession(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const sessionId = formData.get("sessionId") as string;
  const clients = await getClients();
  const client = clients.find((c) => c.id === clientId);

  if (!client) redirect("/dashboard/clients");

  client!.sessions = client!.sessions.filter(
    (s) => s.id !== sessionId
  );
  client!.sessions.forEach((s, i) => {
    s.sessionNumber = i + 1;
  });
  await saveClients(clients);
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}`);
}

export async function addAssessment(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const clients = await getClients();
  const client = clients.find((c) => c.id === clientId);

  if (!client) redirect("/dashboard/clients");

  const assessment: Assessment = {
    id: generateId(),
    toolName: formData.get("toolName") as string,
    date: formData.get("date") as string,
    result: formData.get("result") as string,
    notes: (formData.get("notes") as string) || "",
  };

  client!.assessments.push(assessment);
  await saveClients(clients);
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}`);
}

export async function deleteAssessment(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const assessmentId = formData.get("assessmentId") as string;
  const clients = await getClients();
  const client = clients.find((c) => c.id === clientId);

  if (!client) redirect("/dashboard/clients");

  client!.assessments = client!.assessments.filter(
    (a) => a.id !== assessmentId
  );
  await saveClients(clients);
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}`);
}
