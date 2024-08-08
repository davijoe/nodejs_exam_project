<script>
    import axios from 'axios';
    import KanbanColumn from './KanbanColumn.svelte';

    let columns = [];

    const fetchKanban = async () => {
        const response = await axios.get('/api/kanban');
        columns = response.data[0].columns;
    };

    fetchKanban();
</script>
  
<main>
    {#each columns as column}
        <KanbanColumn {column} />
    {/each}
</main>
  