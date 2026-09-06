'use client';

import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (!notes || notes.length === 0) {
    return <div className={css.empty}>No notes found</div>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <span className={css.tag}>{note.tag}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}