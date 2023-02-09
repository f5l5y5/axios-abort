declare type TKey = {
	url: string
	method: string
}
declare class PendStack {
	private pendingMap: Map<string, AbortController[]> | Map<any, any>
	public add({ url, method }: TKey): AbortSignal
	public judge({ url, method }: TKey)
	public remove({ url, method }: TKey)
}
