<template>
    <step-stool-layout>
        <div style="padding: 10px;">
            <Card style="">
                <p slot="title">
                    Build Setting
                </p>
                <div>
                    msbuild location
                    <Input search enter-button placeholder="select path of msbuild" />
                </div>
            </Card>
        </div>
    </step-stool-layout>
</template>

<script>
  import StepStoolLayout from './StepStoolLayout';

  export default {
    name: 'GlobalSetting',
    components: { StepStoolLayout },
  };
</script>

<style scoped>

</style>