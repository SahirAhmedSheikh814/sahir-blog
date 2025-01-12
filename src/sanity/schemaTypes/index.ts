import { type SchemaTypeDefinition } from 'sanity'
import HeroPageSchema from './HeroPageSchema'
import BlogPageSchema from './BlogPageSchema'
import AuthorSchema from './AuthorSchema'
import AboutPageSchema from './AboutPageSchema'
import NavBarSchema from './NavbarSchema'
import BlockContent from './BlockContent'
import bigPostSchema from './BigPostSchema'
import FaqPageSchema from './FaqPageSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [HeroPageSchema,BlogPageSchema,AuthorSchema,BlockContent,AboutPageSchema,NavBarSchema,bigPostSchema,FaqPageSchema],
}
