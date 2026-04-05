import{jw as p}from"./iframe-MKfqFOD8.js";import{S as a}from"./SchemaDrivenAnnotationEditor-CAiqJ-FZ.js";import"./index-Chi_LkuB.js";import"./useEntity-C7wbNsA9.js";import"./pickBy-BkUQgDmm.js";import"./isString-5GsEY6VE.js";import"./_baseIteratee-DDxx7wlp.js";import"./useInfiniteQuery-BG9mEZpV.js";import"./InfiniteQueryUtils-CKlRW-xB.js";import"./useEntityBundle-ChHnXsJI.js";import"./useSchema-DfE4_tRK.js";import"./index-C1P4pII2.js";import"./enums-Dq4KyWFh.js";import"./_arrayReduce-CrxnWFSq.js";import"./_baseEach-BAlWuIp6.js";import"./uniq-DNrkoE6H.js";import"./forEach-UWyboym_.js";import"./Add-fTtK8wb9.js";import"./Grid-CtUQ9ERB.js";import"./ListItem-B3cmV6ok.js";import"./listItemButtonClasses-DGwXwAMk.js";import"./ListItemIcon-DGCTaCh1.js";import"./MenuItem-A_sRjryR.js";import"./ListItemText-CavAKKFd.js";import"./ArrowUpward-DEV5MTa9.js";import"./ContentCopy-BcLVJZQJ.js";import"./FormControlLabel-B5UuM6UV.js";import"./Checkbox-BHMyXJ7B.js";import"./SwitchBase-BRQ6Hx4R.js";import"./FormGroup-D2DCu9HL.js";import"./RadioGroup-D2d2KB4-.js";import"./Radio-DcUI5GAc.js";import"./Slider-xNn2BkyW.js";import"./visuallyHidden-Dan1xhjv.js";import"./ConfirmationDialog-xjYdNlBh.js";import"./DialogBase-sqgBoDKn.js";import"./Close-DbfkXeYU.js";import"./HelpPopover-JiNUdC6G.js";import"./MarkdownPopover-DW_c7wkC.js";import"./LightTooltip-CIyd6sa2.js";import"./MarkdownSynapse-Cf8WvGE4.js";import"./SkeletonButton-DeN5-pZo.js";import"./SkeletonInlineBlock-F_c8IDKO.js";import"./SkeletonTable-csENOylF.js";import"./SkeletonParagraph-FVQhx8Xz.js";import"./JsonSchemaForm-CgNCrEIY.js";import"./GridLegacy-DsD6Fgbe.js";import"./HelpTwoTone-CxJ8ceOm.js";import"./index-browser-esm-k-o2Qe0C.js";import"./groupBy-Cl6vluXb.js";import"./_createAggregator-C8WzxNyX.js";import"./_baseMap-Bfewz1-m.js";import"./DateTimePicker-DyoUy255.js";import"./useMobilePicker-BcqF3skt.js";import"./index-CvmZKthN.js";import"./index-Chjiymov.js";import"./InputAdornment-CNdx3WYe.js";import"./index-vuOGBU-4.js";import"./Chip-nSYhQ0xM.js";import"./Tabs-BSkQWKeb.js";import"./KeyboardArrowRight-BOaauvJu.js";import"./Autocomplete-DgkBqjhh.js";import"./usePreviousProps-OjlbKFqY.js";import"./use-deep-compare-effect.esm-CXVJ40c2.js";import"./TextWidget-BYKKgcRz.js";const{fn:i}=__STORYBOOK_MODULE_TEST__,vr={title:"Synapse/SchemaDrivenAnnotationEditor",component:a,args:{onSuccess:i(),onCancel:i(),onChange:i()}},r={args:{schemaId:"dev.grosenbacher.test-Arrays",entityId:"syn25959281"}},e={args:{schemaId:"dev.grosenbacher.test-IfThenElse"}},t={args:{schemaId:"nkauer-ad.main"}},o={args:{entityId:"syn32673093"}},n={args:{entityId:"syn25959288"}},s={args:{validationSchema:{$schema:"http://json-schema.org/draft-07/schema#",$id:`https://repo-prod.prod.sagebase.org/repo/v1/schema/type/registered/${p.jsonSchemaVersionInfo.$id}`,type:"object",properties:{country:{enum:["USA","CA"],description:"Test description for country property"},showStringArray:{type:"boolean"}},required:["country"],allOf:[{if:{properties:{country:{const:"USA"}},required:["country"]},then:{properties:{state:{type:"string"}},required:["state"]}},{if:{properties:{country:{const:"CA"}},required:["country"]},then:{properties:{province:{type:"string"}},required:["province"]}},{if:{properties:{showStringArray:{const:!0}},required:["showStringArray"]},then:{properties:{stringArray:{type:"array",items:{type:"string"}}}}}]}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    schemaId: 'dev.grosenbacher.test-Arrays',
    entityId: 'syn25959281'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    schemaId: 'dev.grosenbacher.test-IfThenElse'
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    schemaId: 'nkauer-ad.main'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    entityId: 'syn32673093'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    entityId: 'syn25959288'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    validationSchema: {
      $schema: 'http://json-schema.org/draft-07/schema#',
      $id: \`https://repo-prod.prod.sagebase.org/repo/v1/schema/type/registered/\${mockSchemaBinding.jsonSchemaVersionInfo.$id}\`,
      type: 'object',
      properties: {
        country: {
          enum: ['USA', 'CA'],
          description: 'Test description for country property'
        },
        showStringArray: {
          type: 'boolean'
        }
      },
      required: ['country'],
      allOf: [{
        if: {
          properties: {
            country: {
              const: 'USA'
            }
          },
          required: ['country']
        },
        then: {
          properties: {
            state: {
              type: 'string'
            }
          },
          required: ['state']
        }
      }, {
        if: {
          properties: {
            country: {
              const: 'CA'
            }
          },
          required: ['country']
        },
        then: {
          properties: {
            province: {
              type: 'string'
            }
          },
          required: ['province']
        }
      }, {
        if: {
          properties: {
            showStringArray: {
              const: true
            }
          },
          required: ['showStringArray']
        },
        then: {
          properties: {
            stringArray: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }]
    }
  }
}`,...s.parameters?.docs?.source}}};const Ir=["Arrays","IfThenElse","ComplexSchema","DerivedAnnotations","ErrorsEntity","DirectlyProvidedSchema"];export{r as Arrays,t as ComplexSchema,o as DerivedAnnotations,s as DirectlyProvidedSchema,n as ErrorsEntity,e as IfThenElse,Ir as __namedExportsOrder,vr as default};
