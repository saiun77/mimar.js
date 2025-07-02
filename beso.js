import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('beso')
    .setDescription('Envía un beso a otro usuario 💋')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('El usuario al que quieres besar')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const targetUser = interaction.options.getUser('usuario');

      // Verificaciones básicas
      if (targetUser.id === interaction.user.id) {
        return await interaction.reply({
          content: '😅 No puedes besarte a ti mismo. ¡Pero te queremos igual!',
          flags: MessageFlags.Ephemeral
        });
      }

      if (targetUser.bot) {
        return await interaction.reply({
          content: '🤖 ¡Los bots no pueden recibir besos... por ahora!',
          flags: MessageFlags.Ephemeral
        });
      }

      const imageUrl = 'https://i.imgur.com/HwqSNyy.jpg';

      const embed = new EmbedBuilder()
        .setColor('#FF69B4')
        .setTitle('💋 ¡Beso entregado!')
        .setDescription(`**${interaction.user.username}** le dio un beso a **${targetUser.username}** 😘`)
        .setImage(imageUrl)
        .setFooter({
          text: `Besito digital cortesía de ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL()
        })
        .setTimestamp();

      await interaction.reply({
        embeds: [embed]
      });

    } catch (error) {
      console.error('Error ejecutando comando beso:', error);
      await interaction.reply({
        content: '❌ Ocurrió un error al intentar enviar el beso.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};
