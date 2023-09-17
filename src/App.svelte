<script lang="ts">
  import PreviewTable from './lib/PreviewTable.svelte';
  import ReplacePattern from './lib/ReplacePattern.svelte';
  import ReplacePreview from './lib/ReplacePreview.svelte';
  import SearchPattern from './lib/SearchPattern.svelte';
  import SearchSubject from './lib/SearchSubject.svelte';
  import SearchSubjectInspect from './lib/SearchSubjectInspect.svelte';

  let searchPattern = "input regexp"
  let searchSubject = "input target texts";

  let replacePattern = "input replacement pattern";
  let replacePreview = "";
</script>

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

<style>
</style>
