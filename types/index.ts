export interface Reservation {
  id?: string;
  nom: string;
  telephone: string;
  email: string;
  formation: string;
  date_rdv: string;
  heure: string;
  message?: string;
  statut?: "nouveau" | "contacte" | "confirme" | "annule" | "termine";
  notes_admin?: string;
  created_at?: string;
}

export interface Testimonial {
  text: string;
  author: string;
}
