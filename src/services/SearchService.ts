import { searchCategoriesApi } from '@/apis/category.api'
import { searchTagsApi } from '@/apis/tag.api'
import { searchEventStreamManager } from '@/apis/event.api'

export const SearchCategories = async (inputValue: string) => {
  return (await searchCategoriesApi(inputValue)).map(category => ({
    value: category.id,
    label: category.name,
  }))
}

export const SearchTags = async (inputValue: string) => {
  return (await searchTagsApi(inputValue)).map(tag => ({
    value: tag.id,
    label: tag.name,
  }))
}

export const SearchEvent = async (inputValue: string) => {
  return (await searchEventStreamManager(inputValue)).map(event => ({
    value: event.subEvents[0].id,
    label: event.name,
  }))
}
