import {BlockEntity, BlockIdentity, BlockUUID} from "@logseq/libs/dist/LSPlugin";

// region logseq specific

function getFirstCodeBlockContent(content: string): string | null {
    const lines = content.trim().split("\n");

    let start: number | null = null;
    let end: number | null = null
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (line.trim().startsWith("```")) {
            if (start === null) {
                start = i + 1;
            } else {
                end = i;
                break;
            }
        }
    }
    if (end === null) {
        return null;
    } else {
        return lines.slice(start, end).join("\n")
    }
}

export async function findCodeBlock(rendererBlockIdentity: BlockIdentity): Promise<[BlockUUID, string] | null> {
    let block = await logseq.Editor.getBlock(rendererBlockIdentity, {includeChildren: true});
    let code = getFirstCodeBlockContent(block.content);
    if (code === null) {
        if (block.children.length == 0) {
            return null
        } else {
            block = (block.children[0] as BlockEntity)
            code = getFirstCodeBlockContent(block.content);
        }
    }
    return [block.uuid, code]
}

export async function findCode(rendererBlockIdentity: BlockIdentity): Promise<string> {
    const [, code] = await findCodeBlock(rendererBlockIdentity)
    return code;
}

export function isRendererBlock(blockEntity: BlockEntity | null | undefined): boolean {
    if (!blockEntity) {
        return false;
    }
    const content = blockEntity.content;
    return content != null && content.trim().startsWith("{{renderer ");
}

// endregion

export function dedent(str: string) {
    // thanks https://codepen.io/gskinner/pen/BVEzox
    str = str.replace(/^\n/, "");
    let match = str.match(/^\s+/);
    return match ? str.replace(new RegExp("^" + match[0], "gm"), "") : str;
}


export function urlSafeBase64(str: string) {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_")
}

export function htmlEscape(text: string) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("'", "&#039;")
        .replaceAll("\"", "&quot;")
        .replaceAll(" ", "&nbsp;");
}