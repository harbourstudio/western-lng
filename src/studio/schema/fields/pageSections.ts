import { defineArrayMember, defineField } from 'sanity';
import divider from '../objects/sections/divider';
import hero from '../objects/sections/hero';
import postList from '../objects/sections/postList';
import subscribe from '../objects/sections/subscribe';
import subnavigation from '../objects/sections/subnavigation';
import section from '../objects/sections/section';
import heroFullscreen from '../objects/sections/heroFullscreen';

import heroMinimal from '../objects/sections/heroMinimal';
import coverImage from '../objects/sections/coverImage';

const pageSectionsObjects = [divider, hero, postList, subscribe, subnavigation, section, heroFullscreen, heroMinimal, coverImage];

export default defineField({
  name: 'pageSections',
  title: 'Page Sections',
  type: 'array',
  of: pageSectionsObjects.map(({ name }) => defineArrayMember({ type: name })),
  group: 'content',
});
