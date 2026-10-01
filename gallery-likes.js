const SUPABASE_URL="https://fymalafgyoiwjxbkkmta.supabase.co";
const SUPABASE_KEY="sb_publishable_BONoTx6NCnML5GL_GGriGQ_XT2Rb1i6";
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

function getVisitorId(){
  let id=localStorage.getItem("lite-gallery-visitor-id");
  if(!id){
    id=crypto.randomUUID();
    localStorage.setItem("lite-gallery-visitor-id",id);
  }
  return id;
}

const visitorId=getVisitorId();

async function loadLikes(){
  const {data,error}=await supabaseClient
    .from("gallery_likes")
    .select("image_id,visitor_id");

  if(error){
    console.error("Gallery likes:",error);
    return;
  }

  document.querySelectorAll(".like-button").forEach(button=>{
    const id=button.dataset.imageId;
    const likes=data.filter(row=>row.image_id===id);
    const count=button.querySelector("b");

    count.textContent=likes.length;

    if(likes.some(row=>row.visitor_id===visitorId)){
      button.classList.add("liked");
      button.querySelector("span").textContent="Liked";
      button.firstChild.textContent="♥ ";
    }
  });
}

async function likeImage(button){
  const id=button.dataset.imageId;

  if(button.classList.contains("liked")) return;

  button.disabled=true;

  const {data,error}=await supabaseClient.rpc("like_gallery_image",{
    p_image_id:id,
    p_visitor_id:visitorId
  });

  if(error){
    console.error("Gallery like:",error);
    button.disabled=false;
    return;
  }

  button.classList.add("liked");
  button.querySelector("span").textContent="Liked";
  button.firstChild.textContent="♥ ";

  const count=button.querySelector("b");
  count.textContent=data ?? Number(count.textContent)+1;

  button.disabled=false;
}

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".like-button").forEach(button=>{
    button.addEventListener("click",()=>likeImage(button));
  });

  loadLikes();
});