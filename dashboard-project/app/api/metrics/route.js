// app/api/metrics/route.js
import { supabase } from '../../../lib/supabaseClient';

export async function GET(req) {
  const { data, error } = await supabase.from('metrics').select('*');
  if (error) return new Response(JSON.stringify({ error }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  const { name, uv, pv } = await req.json();
  const { data, error } = await supabase.from('metrics').insert([{ name, uv, pv }]);
  if (error) return new Response(JSON.stringify({ error }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 201 });
}
