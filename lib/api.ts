import axios from 'axios';
import { Note, FetchNotesResponse } from '@/types/note';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page = 1,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    search,
  };

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: { title: string; content: string; tag: string }): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', noteData);
  return data;
};
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};