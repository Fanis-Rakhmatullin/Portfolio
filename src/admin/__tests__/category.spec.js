import skill from '../components/skill/skill.vue';

import {shallowMount} from "@vue/test-utils";

it('Удаляется скилл при нажатии на иконку', async () => {
    const wrapper = shallowMount(skill, {
        propsData: {
            skill: {
                id: 1,
                title: 'Тестовый скилл',
                percent: 21,
                category: 228,
            },
        }
    });

    // console.log(wrapper.html());
    await wrapper.find(".btn--trash").trigger("click");

    expect(wrapper.exists()).toBe(false);
})