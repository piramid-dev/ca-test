import datoCmsClient from './datocms.server'

export const createPrompterSurvey = async (
  answers: any,
  started_at: string | number | Date,
  userId: any,
) => {
  const client = datoCmsClient()

  await client.items.create({
    item_type: {
      type: 'item_type',
      id: '2110933',
    },
    form_type: 'prompter',
    answers,
    started_at: new Date(started_at),
    finished_at: new Date(),
    user: userId,
  })
}
