"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAnnouncements, getSeen, markSeen } from "@/lib/announcements";

/*
  Source unique des annonces et du nombre de non lues.
  Utilisée par la barre de navigation : le badge du burger (mobile)
  et celui de la cloche affichent donc toujours le même nombre.
*/
export default function useAnnouncements() {
  const [items, setItems] = useState(null);
  const [seen, setSeen] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchAnnouncements().then((list) => {
      if (cancelled) return;
      setSeen(getSeen());
      setItems(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const unread = items ? items.filter((a) => a.createdAt > seen).length : 0;

  // Marque toutes les annonces comme lues (appelé à l'ouverture du panneau)
  const markAllSeen = useCallback(() => {
    if (!items || items.length === 0) return;
    const newest = items[0].createdAt;
    markSeen(newest);
    setSeen(newest);
  }, [items]);

  return { items, seen, unread, markAllSeen };
}