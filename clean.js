/**
 * This boilerplate contains a lot of files serving as placeholders to display
 * preferred folder structure and conventions. This is a convenience script
 * that deletes them, it is meant to be run after having removed all references
 * to placeholder files in structural files (App.tsx and store folder).
 */

const globby = require('globby')
const rimraf = require('rimraf')

const patternsToRemove = [
  '__tests__/{actions,reducers}/counter.test.ts',
  '__tests__/components/{Counter,FancyCounter}.test.tsx',
  '__tests__/containers/CounterContainer.test.tsx',
  'src/components/{Counter,FancyCounter}/*',
  'src/containers/Counter.container.ts',
  'src/store/actions/counter.actions.ts',
  'src/store/reducers/counter.reducer.ts',
  'src/store/state/Counter.state.ts',
  __filename
]

const foldersToRemove = [
  'src/components/Counter',
  'src/components/FancyCounter'
]
globby(patternsToRemove)
  .then(files => {
    let all = [...files, ...foldersToRemove]

    all.forEach(f => rimraf(f, (err) => {
      if (err) console.log(err)
    }))
  })
