<script lang="ts">
    import { onMount } from "svelte";

    type Token = {
        kind: "matched"
        matchStyle: number,
        text: string,
    } | {
        kind: "regular",
        text: string,
    }

    export let searchPattern: string;
    export let searchSubject: string;

    let tokenLines: Token[][] = [];
    let errorMessage = "";
    let textareaRef: HTMLElement;
    let textlikeRef: HTMLElement;
    let textareaLikeWrapRef: HTMLElement;

    $: {
        try {
            errorMessage = "";
            
            const regexp = new RegExp(searchPattern, "d");
            const subjectLines = searchSubject.split(/\n/);
            tokenLines = subjectLines.map((subjectLine => [{
                kind: "regular",
                text: subjectLine
            }]));
            tokenLines = subjectLines.map((subjectLine) => {
                const execed = regexp.exec(subjectLine)
                const tokens: Token[] = [];
                if (execed) {
                    const indices = execed.indices;
                    let previousEnd = 0;
                    for (let i = 1; i < indices.length; i++) {
                        const index = indices[i];
                        const start = index[0];
                        const end = index[1];
                        tokens.push({
                            kind: "regular",
                            text: subjectLine.substring(previousEnd, start)
                        });
                        tokens.push({
                            kind: "matched",
                            matchStyle: i,
                            text: subjectLine.substring(start, end)
                        });
                        previousEnd = end;
                    }
                    tokens.push({
                        kind: "regular",
                        text: subjectLine.substring(previousEnd)
                    });
                } else {
                    tokens.push({
                        kind: "regular",
                        text: subjectLine
                    })
                }
                return tokens;
            });
        } catch (e) {
            errorMessage = e.toString();
        }
    }

    const handleScroll = () => {
        textareaLikeWrapRef.scrollTop = textareaRef.scrollTop;
    }
    onMount(() => {
       textareaRef.addEventListener('input', handleScroll);
       textareaRef.addEventListener('scroll', handleScroll);

       () => {
         textareaRef.removeEventListener('input', handleScroll);
         textareaRef.removeEventListener('scroll', handleScroll);
       }
    })
</script>

<style>
.token__matched {
    color: #fff;
    font-weight: lighter;
    border-bottom: solid 1px hsla(var(--hue), 10%, 60%, 1.0);
    background-color: hsla(var(--hue), 30%, 70%, 1.0);
}


textarea,
.textarea-like-wrap,
.textarea-like
{
    width: 100%;
}

.textarea-wrap
{
    height: calc(100vh - 90px);
}

textarea {
    appearance: none;
    color: transparent;
    caret-color: #99f;
    height: 100%;
    border: none;
}
textarea::selection {
    /* background: rgba(255, 255, 255, 0.90); */
}

.textarea-like-wrap {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    background: transparent;
    width: 100%;
    pointer-events: none;
    overflow-y: scroll;
}

.textarea-like {
    height: 100%;
    width: 100%;
}

.textarea-wrap {
    position: relative;
    padding: 0;
}

</style>


{#if errorMessage != ""}
    <span class="errorMessage">{errorMessage}</span>
{/if}
<div class="textarea-wrap">
    <textarea bind:value={searchSubject} bind:this={textareaRef}/>
    <div class="textarea-like-wrap" bind:this={textareaLikeWrapRef}>
        <div class="textarea-like" bind:this={textlikeRef}>
            {#each tokenLines as line, index}
                {#each line as m}
                <span
                        class="token"
                        style="--hue: {m.kind == "matched" && (30 * m.matchStyle * 3 + 90) % 360}"
                        class:token__matched={m.kind == "matched"}
                        >
                    {m.text}
                </span>
                {/each}
                {#if line.length === 1 && line[0].text === ""}
                    &nbsp;
                {/if}
                {#if index != tokenLines.length - 1}
                    <br>
                {/if}
            {/each}
        </div>
    </div>
</div>
