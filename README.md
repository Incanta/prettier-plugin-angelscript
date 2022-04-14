# Prettier Plugin for Unreal AngelScript

This is a :warning: **WORK IN PROGRESS** :warning: plugin to enable Prettier support for Hazelight's version of AngelScript for Unreal Engine.

The `package.json` links to a `angelscript-parser@1.1.1`, but it actually is using our fork of the parser at https://github.com/IncantaGames/angelscript-parser, and it is linked to this repo using `yarn link`:

1. Clone both repos in separate directories
1. In the `angelscript-parser` folder:
    1. `yarn`
    1. `yarn build`
    1. `yarn link`
1. In `prettier-plugin-angelscript` folder:
    1. `yarn link angelscript-parser`
    1. `yarn`
    1. `yarn build`

This plugin currently doesn't function at all, but the parser *should* be set up to parse the Unreal AngelScript properly (including `UPROPERTY`, `UFUNCTION`, `UCLASS`, `USTRUCT`, `default` variable values, `access` declarations and reference). Take this statement with a grain a salt though as there was very little testing.

From here, we should be able to just implement crawling the AST from the parser in the various `print` functionality of the prettier plugin to tell prettier how to print everything.

This project might go months, if not years, before it's functional due to me needing to actually make my game 😅. If you're interested in helping out, let me know!
