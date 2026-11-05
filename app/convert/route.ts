import {NextRequest,NextResponse} from 'next/server';
export const runtime='nodejs';
export async function POST(request:NextRequest){
const backend=process.env.CONVERTER_BACKEND_URL;
if(!backend)return NextResponse.json({error:'The website is running, but the conversion backend is not configured. Set CONVERTER_BACKEND_URL to a compatible processing service.'},{status:503});
let body;try{body=await request.json()}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
if(!/^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/|youtu\.be\/)/i.test(body.url||''))return NextResponse.json({error:'Enter a valid YouTube URL'},{status:400});
try{const upstream=await fetch(`${backend.replace(/\/$/,'')}/convert`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(25000)});if(!upstream.ok)return NextResponse.json({error:'Backend could not process this request.'},{status:upstream.status});return new Response(upstream.body,{headers:{'content-type':upstream.headers.get('content-type')||'application/octet-stream','content-disposition':upstream.headers.get('content-disposition')||'attachment'}})}catch{return NextResponse.json({error:'Backend unreachable or conversion timed out. For large media use a backend with asynchronous jobs and direct file delivery.'},{status:502})}
}
