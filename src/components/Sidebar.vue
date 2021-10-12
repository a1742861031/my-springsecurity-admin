<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.id" :key="item.id">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu v-if="subItem.subs" :index="subItem.herf" :key="subItem.id">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.href">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.href" :key="subItem.id">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import menu from '../api/menu'

    import {
        computed,
        watch
    } from "vue";
    import {
        useStore
    } from "vuex";
    import {
        useRoute
    } from "vue-router";
    export default {
        data() {
            return {
                items: {},
            };
        },
        created() {
            this.getMenus();
        },

        methods: {
            getMenus() {
                menu.getMenu().then(res=>{
                    console.log(res.data);
                    this.items = res.data.menus
                })
            },
        },

        setup() {
            const route = useRoute();
            const onRoutes = computed(() => {
                return route.path;
            });

            const store = useStore();
            const collapse = computed(() => store.state.collapse);

            return {
                onRoutes,
                collapse,
            };
        },
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar>ul {
        height: 100%;
    }
</style>