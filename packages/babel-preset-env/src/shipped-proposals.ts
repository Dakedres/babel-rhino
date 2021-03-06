// TODO(Babel 8): Remove this file
/* eslint sort-keys: "error" */
// These mappings represent the transform plugins that have been
// shipped by browsers, and are enabled by the `shippedProposals` option.

const proposalPlugins = new Set<string>();

// proposal syntax plugins enabled by the `shippedProposals` option.
// Unlike proposalPlugins above, they are independent of compiler targets.
const proposalSyntaxPlugins = ["syntax-import-assertions"] as const;

// use intermediary object to enforce alphabetical key order
const pluginSyntaxObject = {
  "proposal-async-generator-functions": "syntax-async-generators",
  "proposal-class-properties": "syntax-class-properties",
  "proposal-class-static-block": "syntax-class-static-block",
  "proposal-json-strings": "syntax-json-strings",
  "proposal-nullish-coalescing-operator": "syntax-nullish-coalescing-operator",
  "proposal-numeric-separator": "syntax-numeric-separator",
  "proposal-object-rest-spread": "syntax-object-rest-spread",
  "proposal-optional-catch-binding": "syntax-optional-catch-binding",
  "proposal-optional-chaining": "syntax-optional-chaining",
  // note: we don't have syntax-private-methods
  "proposal-private-methods": "syntax-class-properties",
  "proposal-private-property-in-object": "syntax-private-property-in-object",
  "proposal-unicode-property-regex": null as null,
} as const;

const pluginSyntaxEntries = Object.keys(pluginSyntaxObject).map<
  [string, string | null]
>(function (key) {
  return [
    key,
    // @ts-expect-error key has been guarded
    pluginSyntaxObject[key],
  ];
});

const pluginSyntaxMap = new Map(pluginSyntaxEntries);

export { proposalPlugins, proposalSyntaxPlugins, pluginSyntaxMap };
