import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/loading";

const IssueForm = dynamic(
  ()=>import('@/app/issues/_components/page'),
  {
    ssr:false,
    loading:()=> <IssueFormSkeleton/>
  }
)
const NewIssuePage = () => {
  
  return (
   <IssueForm/>
  );
};

export default NewIssuePage;
