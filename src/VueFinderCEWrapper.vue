<script setup lang="ts">
/**
 * CE Wrapper that remaps `finder-id` to `id` to avoid conflict with HTMLElement.id
 * All other props are passed through unchanged.
 */
import { computed, onMounted } from 'vue'
import VueFinderProvider from './components/VueFinderProvider.vue'
import type { Driver } from './adapters'
import type { ConfigDefaults } from './stores/config'
import type { FeaturesConfig, FeaturesPreset } from './features'
import type { Item as ContextMenuItem } from './utils/contextmenu'
import type { DirEntry, SelectEvent, UpdatePathEvent, ItemDclickEvent } from './types'

// Define props explicitly to avoid spread issues with reactive props
const props = withDefaults(defineProps<{
  finderId?: string
  driver?: Driver
  config?: ConfigDefaults
  features?: FeaturesPreset | FeaturesConfig
  debug?: boolean
  locale?: string
  contextMenuItems?: ContextMenuItem[]
  selectionMode?: 'single' | 'multiple'
  selectionFilterType?: 'files' | 'dirs' | 'both'
  selectionFilterMimeIncludes?: string[]
  onError?: (error: any) => void
  onSelect?: SelectEvent
  onPathChange?: UpdatePathEvent
  onUploadComplete?: (files: DirEntry[]) => void
  onDeleteComplete?: (deletedItems: DirEntry[]) => void
  onReady?: () => void
  onFileDclick?: (event: ItemDclickEvent) => void
  onFolderDclick?: (event: ItemDclickEvent) => void
  customUploader?: (uppy: any, context: { getTargetPath: () => string }) => void
}>(), {
  finderId: 'vuefinder-default',
  debug: false,
  config: () => ({}),
  features: 'advanced',
  locale: 'en',
  contextMenuItems: undefined,
  selectionMode: 'multiple',
  selectionFilterType: 'both',
  selectionFilterMimeIncludes: () => []
})

// Debug: log props on mount
onMounted(() => {
  console.log('[VueFinderCEWrapper] Props received:', {
    finderId: props.finderId,
    driver: props.driver,
    config: props.config,
    features: props.features,
    locale: props.locale
  })
})

// Only render when driver is provided
const hasDriver = computed(() => !!props.driver)
</script>

<template>
  <div v-if="!hasDriver" class="vuefinder-ce-loading">
    Waiting for driver...
  </div>
  <VueFinderProvider
    v-else
    :id="props.finderId"
    :driver="props.driver!"
    :config="props.config"
    :features="props.features"
    :debug="props.debug"
    :locale="props.locale"
    :context-menu-items="props.contextMenuItems"
    :selection-mode="props.selectionMode"
    :selection-filter-type="props.selectionFilterType"
    :selection-filter-mime-includes="props.selectionFilterMimeIncludes"
    :on-error="props.onError"
    :on-select="props.onSelect"
    :on-path-change="props.onPathChange"
    :on-upload-complete="props.onUploadComplete"
    :on-delete-complete="props.onDeleteComplete"
    :on-ready="props.onReady"
    :on-file-dclick="props.onFileDclick"
    :on-folder-dclick="props.onFolderDclick"
    :custom-uploader="props.customUploader"
  />
  <!-- Note: Not forwarding slots (icon, status-bar) as they override defaults when empty -->
</template>
