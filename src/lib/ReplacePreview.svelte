<script lang="ts">
    export let searchPattern: string;
    export let searchSubject: string;
    export let replacePattern: string;
    export let replacePreview: string;
    type ReplacePreviewLine = {
        type: "mathed",
        text: String,
    } | {
        type: "unmathed",
    };
    let replacePreviewLines: ReplacePreviewLine[] = [];

    let errorMessage = "";

    $: {
        try {
            errorMessage = "";
            
            const regexp = new RegExp(searchPattern, "");
            const subjectLines = searchSubject.split(/\n/);
            const replaced = subjectLines.map((subjectLine): ReplacePreviewLine => {
                if (regexp.test(subjectLine)) {
                    return {
                        type: "mathed",
                        text: subjectLine.replace(regexp, replacePattern)
                    }
                } else {
                    return {
                        type: "unmathed"
                    }
                }
            });
            replacePreviewLines = replaced;
            replacePreview = replacePreviewLines.filter((_) => _.type === "mathed").map((_) => _.text).join("\n");
        } catch (e) {
            errorMessage = e.toString();
        }
    }
</script>

<style>
.textarea-like-wrap {
    height: calc(100vh - 90px);
}
.unmathed {
    color: #f00;
}
</style>

<div class="textarea-like-wrap">
   <code class="textarea-like">
        {#each replacePreviewLines as line, index}
            {#if line.type == "mathed"}<!--
                --><span>{line.text}</span><!--
            -->{:else}<!--
                --><span class="unmathed">unmathed</span><!--
            -->{/if}<!--
            -->{#if index != replacePreviewLines.length - 1}
                <br>
            {/if}
        {/each}
    </code>
</div>
