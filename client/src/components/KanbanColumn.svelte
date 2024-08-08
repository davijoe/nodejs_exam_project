<script>
    export let column;
    import KanbanTask from './KanbanTask.svelte';
</script>
  
<div class="column">
    <h2>{column.name}</h2>
    {#each column.tasks as task}
        <KanbanTask {task} />
    {/each}
</div>
