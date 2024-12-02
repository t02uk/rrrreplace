<script lang="ts">
  import PreviewTable from './lib/PreviewTable.svelte';
  import ReplacePattern from './lib/ReplacePattern.svelte';
  import ReplacePreview from './lib/ReplacePreview.svelte';
  import SearchPattern from './lib/SearchPattern.svelte';
  import SearchSubject from './lib/SearchSubject.svelte';
  import SearchSubjectInspect from './lib/SearchSubjectInspect.svelte';
  import TemplateEditor from './lib/TemplateEditor.svelte';
  import { TemplateRepository, type Template } from './lib/Template';
    import TemplateList from './lib/TemplateList.svelte';

  let searchPattern = "input regexp"
  let searchSubject = "input target texts";

  let replacePattern = "input replacement pattern";
  let replacePreview = "";
  let templates: Template[] = [];
  $: {
    templates = TemplateRepository.getAll();
  }

  type Action = "regular" | "template";
  let action: Action = "template"

  function switchAction(nextAction) {
    action = nextAction;
  }

  function handleApplyTemplate(template: Template) {
    searchPattern = template.search;
    replacePattern = template.replace;
  }
</script>


{#if action == "regular"}
  <button on:click={() => switchAction('template')}>edit template</button>
  <TemplateList templates={templates} onApply={handleApplyTemplate}></TemplateList>
<main>
    <div class="side-by-side">
    <SearchPattern bind:value={searchPattern} />
    <SearchSubjectInspect bind:searchSubject={searchSubject} searchPattern={searchPattern}/>
    </div>
    <div class="side-by-side">
      <ReplacePattern bind:value={replacePattern} />
      <ReplacePreview searchPattern={searchPattern} searchSubject={searchSubject} replacePattern={replacePattern} />
      <!-- <PreviewTable searchPattern={searchPattern} searchSubject={searchSubject} /> -->
    </div>
</main>
{:else}
  <button on:click={() => switchAction('regular')}>close</button>
  <TemplateEditor templates={templates}></TemplateEditor>
{/if}

<style>
</style>
