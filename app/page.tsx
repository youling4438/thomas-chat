import Chat from './chat';
import Draw from './draw';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div role="tablist" className="tabs tabs-bordered">
        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="GPT4o" defaultChecked />
        <div role="tabpanel" className="tab-content p-4"><Chat isGpt4o/></div>
        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="GPT4" />
        <div role="tabpanel" className="tab-content p-4"><Chat /></div>
        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Dalle3" />
        <div role="tabpanel" className="tab-content p-4"><Draw /></div>
      </div>
    </main>
  );
}
