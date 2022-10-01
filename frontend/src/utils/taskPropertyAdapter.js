
// [{value: "value", label: "label"}, ...] --> ["value", ....]
// for priorities, statuses, tags

export function taskPropertyAdapter(property = []) {
    return property.map(item => item.value)
}